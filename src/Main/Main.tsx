import React, { useEffect, useState } from 'react';
import styles from './Main.module.sass';

import img_11 from './1_1.png';
import img_12 from './1_2.png';
import img_13 from './1_3.png';
import img_14 from './1_4.png';

import img_21 from './2_1.png';
import img_22 from './2_2.png';
import img_23 from './2_3.png';
import img_24 from './2_4.png';

import img_31 from './3_1.png';
import img_32 from './3_2.png';

import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay } from 'swiper';
import 'swiper/swiper-bundle.min.css'

import { AppContext } from '../app-context';

import axios from 'axios';

SwiperCore.use([ Autoplay ]);

function Main() {

  const [classes, setClasses] = useState([]);

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
        console.log(res.data.Items);
        setClasses(obj);

      }catch(e){}
    };

    fetchClasses();

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
            <div className={styles.recentClass}>
              <div
                className={styles.classItem}
                onClick={()=>changePage('LIVE')}>
                <img alt="" src={img_11} />
                <p>사이클 기본 마스터</p>
                <p>초급 | 20min | KPOP</p>
              </div>

              <div
                className={styles.classItem}
                onClick={()=>changePage('LIVE')}>
                <img alt="" src={img_12} />
                <p>일요일 아침 같이 걷기</p>
                <p>초급 | 50min | POP</p>
              </div>

              <div
                className={styles.classItem}
                onClick={()=>changePage('LIVE')}>
                <img alt="" src={img_13} />
                <p>쉽게 하는 웨이트</p>
                <p>중급 | 30min | Rock</p>
              </div>

              <div
                className={styles.classItem}
                onClick={()=>changePage('LIVE')}>
                <img alt="" src={img_14} />
                <p>마음이 평온해지는 요가</p>
                <p>고급 | 60min | Classic</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className={styles.title}>우리 함께 운동해요</h3>
            <div
              className={styles.recentClass}
              onClick={()=>changePage('MOTIVATOR')}>
              <div className={styles.classItem}>
                <img alt="" src={img_21} />
              </div>

              <div
              className={styles.recentClass}
              onClick={()=>changePage('MOTIVATOR')}>
                <img alt="" src={img_22} />
              </div>
              
              <div
              className={styles.recentClass}
              onClick={()=>changePage('MOTIVATOR')}>
                <img alt="" src={img_23} />
              </div>

              <div
              className={styles.recentClass}
              onClick={()=>changePage('MOTIVATOR')}>
                <img alt="" src={img_24} />
              </div>
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
