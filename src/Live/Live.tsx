import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './Live.module.sass';

import calendar from './calendar.png';
import setting from './setting.png';

import { SETTINGS } from '../settings';

import { AppContext } from '../app-context';

function Item(props:any){

  const prettyTimeString = (date:string) => {
    date = date.replace('Z', '');
    
    let time = date.split('T')[1];
    let time_split = time.split(':');

    let time_hour = Number(time_split[0]);

    if(time_hour > 21){
      time_split[0] = "PM " + (time_hour - 12);
    }else if(time_hour > 12){
      time_split[0] = "PM 0" + (time_hour - 12);
    }else if(time_hour > 11){
      time_split[0] = "PM 12";
    }else{
      time_split[0] = "AM " + time_split[0];
    }

    let new_time_str = time_split[0] + ':' + time_split[1];

    return new_time_str;
  };

  return(
    <div className={styles.item}>
      <div className={styles.timeline}>
        <span>{prettyTimeString(props.time)}</span>
        <span></span>
      </div>
      <img className={styles.itemThumb} src={props.image} alt="" />
      <div className={styles.itemText}>
        <p>{props.title}</p>
        <p>{props.subtitle}</p>
        <p>{props.name}</p>
        <div className={styles.itemMotivator}>
          {props.motivators.map((d:string, i:number)=>{
            return <img src={SETTINGS.REST_URL + d} alt="" key={i} />
          })}
        </div>
      </div>
      <div className={styles.itemButtons}>
        <p>입장하기</p>
        <img src={setting} alt="" />
        <img src={calendar} alt="" />
      </div>
    </div>
  )
}

function Spacer(props:any){
  return(
    <div className={styles.spacer}>{props.text ? props.text : ''}</div>
  )
}

function Live() {

  const [lectureList, setLectureList] = useState<any[]>([]);

  const refreshData = () => {
   axios.get(SETTINGS.REST_URL + '/lectures/')
    .then((res) => {
      if(res.status === 200){
        let lectureList = res.data.results;

        console.log(lectureList);
        setLectureList(lectureList);
      }
    });   
  };

  useEffect(() => {
    refreshData();
  }, []);

  const prettyDateString = (date:string) => {
    let date_string = date.split('T')[0];
    let date_split = date_string.split('-');
    return date_split[0] + '년 ' + date_split[1] + '월 ' + date_split[2] + '일';
  };

  const getDateText = (n:number) => {
    let date_string = prettyDateString(lectureList[n].date);
    if(n === 0) return date_string;
    else{
      let prev_date_string = prettyDateString(lectureList[n-1].date);
      if(prev_date_string !== date_string) return date_string;
    }
    return '';
  };

  return (
    <div className={styles.root}>
      <AppContext.Consumer>
      {({changePage}) => (
        <div className={styles.left}>
          <span
            className={styles.leftArrow}
            onClick={()=>changePage('MAIN')}></span>
        </div>
      )}
      </AppContext.Consumer>

      <div className={styles.right}>
        {lectureList.map((d:any, i:number) => {
          return(
            <React.Fragment key={i}>
              <Spacer text={getDateText(i)} />
              <Item
                title={d.title}
                subtitle={d.subtitle}
                image={d.image}
                motivators={d.thumbs}
                time={d.date}
              /> 
            </React.Fragment>
          );
        })}
        <Spacer />
      </div>
    </div>
  );

}

export default Live;
