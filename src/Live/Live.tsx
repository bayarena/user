import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './Live.module.sass';

import { Link, useLocation } from "react-router-dom";

import calendar from './calendar.png';
import setting from './setting.png';

import { SETTINGS } from '../settings';

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

  const prettyDateString = (date:string) => {
    let date_string = date.split('T')[0];
    let date_split = date_string.split('-');
    return date_split[0] + '/' + date_split[1] + '/' + date_split[2];
  };

  return(
    <div className={styles.item} id={"classElement" + props.id}>
      <div className={styles.timeline}>
        <span>{prettyDateString(props.time)}</span>
        <span>{prettyTimeString(props.time)}</span>
        <span></span>
      </div>
      <img className={styles.itemThumb} src={props.image} alt="" />
      <div className={styles.itemText}>
        <p>{props.title}</p>
        <p>{props.subtitle}</p>
        <p>{props.name}</p>
        <div className={styles.itemMotivator}>
          {props.motivators.map((d:any, i:number)=>{
            return <img src={d.image_thumb} alt="" key={i} />
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
  const location = useLocation();

  useEffect(() => {
    axios.get(SETTINGS.REST_URL + '/lectures/')
      .then((res) => {
        if(res.status === 200){
          let lectureList = res.data.results;
          setLectureList(lectureList);

          setTimeout(()=>{
            if(location.hash){
              let elem = document.getElementById(location.hash.replace("#", ''));
              if(elem){
                elem.scrollIntoView();
                elem.classList.add(styles.highlight);
              }
            }
          },100);

        }
    });
  }, [location]);

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

  const getSubTitle = (d:any) => {
    let diff = "초급";
    switch(d.difficulty){
      case 1 : diff = "중급"; break;
      case 2 : diff = "고급"; break;
    }

    return diff + " | " + d.time + "min | " + d.theme;
  }

  return (
    <div className={styles.root}>
      <div className={styles.left}>
        <Link to="/">
          <span className={styles.leftArrow}></span>
        </Link>
      </div>

      <div className={styles.right}>
        {lectureList.map((d:any, i:number) => {
          return(
            <React.Fragment key={i}>
              <Spacer text={getDateText(i)} />
              <Item
                id={d.id}
                title={d.title}
                subtitle={getSubTitle(d)}
                image={d.image}
                motivators={d.meta_motivator}
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
