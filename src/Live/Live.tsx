import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './Live.module.css';

import calendar from './calendar.png';
import setting from './setting.png';

import { SETTINGS } from '../settings';

import { AppContext } from '../app-context';

function Item(props:any){
  return(
    <div className={styles.item}>
      <div className={styles.timeline}>
        <span>{props.time}</span>
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

  const [lectureList, setLectureList] = useState([]);

  const refreshData = () => {
   axios.get(SETTINGS.REST_URL + '/lectures/')
    .then((res) => {
      if(res.status === 200){
        let lectureList = res.data.results.reduce((acc:any, curr:any, idx:number)=>{
          let lec = curr;
          acc.push(lec);
          return acc;
        }, []);

        console.log(lectureList);
        setLectureList(lectureList);
      }
    });   
  };

  useEffect(() => {
    refreshData();
  }, []);

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
        <Spacer />
        {lectureList.map((d:any, i:number) => {
          return(
            <React.Fragment>
              <Item
                key={i}
                title={d.title}
                subtitle={d.subtitle}
                image={d.image}
                motivators={d.thumbs}
              /> 
              <Spacer />
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );

}

export default Live;
