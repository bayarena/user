import React, { useEffect, useState } from 'react';
import styles from './Main.module.sass';

import img_31 from './3_1.png';
import img_32 from './3_2.png';

import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay } from 'swiper';
import 'swiper/swiper-bundle.min.css'

import { AppContext } from '../app-context';

import { SETTINGS } from '../settings';

import axios from 'axios';

SwiperCore.use([ Autoplay ]);

function ClassItem(props:any){

  const getSubTitle = () => {
    let diff = "초급";
    switch(props.difficulty){
      case 1 : diff = "중급"; break;
      case 2 : diff = "고급"; break;
    }

    return diff + " | " + props.time + "min | " + props.theme;
  }

  return(
    <div
      className={styles.SmallClassItem}
      onClick={()=>props.onClick()}>
      <img alt="" src={props.image} />
      <p>{props.title}</p>
      <p>{getSubTitle()}</p>
    </div>
  );
}

function MotivatorItem(props:any){
  return(
    <div
      className={styles.SmallMotivatorItem}
      onClick={()=>props.onClick()}
      style={{
        backgroundImage: "url('" + props.image + "')"
      }}>
      <p>{props.name_kor}</p>
    </div>
  );
}


function Main() {

  const [classes, setClasses] = useState([]);
  const [recentClasses, setRecentClasses] = useState([]);
  const [motivatorList, setMotivatorList] = useState([]);

  const fetchRecentClasses = () => {
    axios.get(SETTINGS.REST_URL + '/lectures?length=4')
      .then((res)=>{
        setRecentClasses(res.data.results);
      });
  };

  const fetchMotivators = () => {
    axios.get(SETTINGS.REST_URL + '/motivators/')
      .then((res)=>{
        setMotivatorList(res.data.results);
      });
  };

  useEffect(() => {
    const fetchClasses = async() => {
      try{

        const res = await axios.get(
          'https://3nv8tb5hag.execute-api.ap-northeast-2.amazonaws.com/items'
        );

        // Sort by order
        let obj = res.data.Items;
        obj = obj.sort(function(a:any,b:any){
          return a['order'] - b['order'];
        });
        setClasses(obj);

      }catch(e){}
    };

    fetchClasses();
    fetchRecentClasses();
    fetchMotivators();
  }, []);

  return (
  <AppContext.Consumer>
  {({changePage}) => (
    <div className={styles.root}>
        <Swiper
          className={styles.sign}
          spaceBetween={0}
          slidesPerView={1}
          autoplay={{delay: 2500}}>
          {classes.map((d, i) => {
            return(<SwiperSlide
                      key={i}
                      style={{
                        backgroundSize: "cover",
                        backgroundImage: "url(" + d['image'] + ")"
                      }}>
                    <span
                      className={styles.classEnter}
                      onClick={()=>changePage("LIVE")}>입장하기</span>
                   </SwiperSlide>)
          })}
        </Swiper>

        <div className={styles.menu}>

          <div className={styles.tagGroup}>
            <span>#오늘라이브</span>
            <span>#힙합</span>
            <span>#사이클</span>
            <span>#김계란</span>
            <span>#80년대힙합</span>
            <span>#요가</span>
            <span>#다이어트</span>
            <span>#케이팝</span>
            <span>#20분운동</span>
            <span>#그룹운동</span>
          </div>

          <div>
            <h3 className={styles.title}>최근 클래스</h3>
            <div className={styles.ItemGroup}>
            {recentClasses.map((d:any, i:number) => {
              return <ClassItem key={i} onClick={()=>changePage('LIVE')} {...d} />;
            })}
            </div>
          </div>

          <div>
            <h3 className={styles.title}>우리 함께 운동해요</h3>
            <div className={styles.ItemGroup}>
            {motivatorList.slice(0,4).map((d:any, i:number) => {
              return <MotivatorItem key={i} onClick={()=>changePage('MOTIVATOR')} {...d} />;
            })}
            </div>
          </div>

          <div className={styles.largeMenu}>
            <img alt="" src={img_31} onClick={()=>changePage('CATEGORY')}/>
            <img alt="" src={img_32} onClick={()=>changePage('SINGLE')}/>
          </div>
        </div>
    </div>
  )}
  </AppContext.Consumer>
  );
}

export default Main;
