import React, { useEffect, useState } from 'react';
import styles from './Main.module.sass';

import { Link } from "react-router-dom";

import img_31 from './3_1.png';
import img_32 from './3_2.png';

import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay } from 'swiper';
import 'swiper/swiper-bundle.min.css'

import { SETTINGS } from '../settings';

import axios from 'axios';

SwiperCore.use([ Autoplay ]);

function TitleItem(props:any){
  return(
    <div
      className={styles.TitleItem}
      style={{
        height: props.height + "px",
        lineHeight: props.height + "px",
        background: "url('" + props.image + "')",
        backgroundSize: "cover"}}>
        <div>
          <p>{props.title}</p>
        </div>
    </div>
  );
}

function ClassItem(props:any){

  const getDiff = () => {
    switch(props.difficulty){
      case 1 : return "중급"
      case 2 : return "상급"
      default : return "초급"
    }
  }

  const getDiffColor = () => {
    switch(props.difficulty){
      case 1 : return "#2196f3";
      case 2 : return "#e91e63";
      default : return "#8bc34a";
    }
  }

  return(
    <div
      style={{
        background: "url('" + props.image + "')",
        backgroundSize: "cover"
      }}
      className={styles.SmallClassItem}>
      <div>
        <p style={{background: getDiffColor()}}>{getDiff()}</p>
        <div>
          <img src={props.meta_motivator[0].image_thumb} alt="" />
          <p>{props.meta_motivator[0].name_kor}</p>
          <p>{props.title}</p>
        </div>
      </div>
    </div>
  );
}

function MotivatorItem(props:any){
  return(
    <div
      className={styles.SmallMotivatorItem}
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
    axios.get(SETTINGS.REST_URL + '/motivators/?meta')
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
                      className={styles.classEnter}>입장하기</span>
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
            <Swiper
              spaceBetween={0}
              slidesPerView={4}>

              <SwiperSlide>
                <Link to="/LiveToday">
                  <TitleItem
                    title="최근 클래스"
                    image="https://d.newsweek.com/en/full/1890945/exercise.jpg"
                    height={240} />
                </Link>
              </SwiperSlide>

              {recentClasses.map((d:any, i:number) => {
                return(<SwiperSlide>
                          <Link to="/LiveToday">
                            <ClassItem key={i} {...d} />
                          </Link>
                       </SwiperSlide>)
              })}
            </Swiper>
          </div>

          <div>
            <Swiper
              spaceBetween={0}
              slidesPerView={4}>

              <SwiperSlide>
                <Link to="/motivator">
                  <TitleItem
                    title="함께 운동해요"
                    image="https://i0.wp.com/images-prod.healthline.com/hlcmsresource/images/News/4773-execise_class-1296x728-header.jpg?w=1155&h=1528"
                    height={150} />
                </Link>
              </SwiperSlide>

              {motivatorList.slice(0,4).map((d:any, i:number) => {
                return(<SwiperSlide>
                        <Link to={"/motivator/" + d.id}>
                          <MotivatorItem key={i} {...d} />
                        </Link>
                       </SwiperSlide>)
              })}
            </Swiper>
          </div>

          <div className={styles.largeMenu}>
            <Link to="/category"><img alt="" src={img_31} /></Link>
            <Link to="/single"><img alt="" src={img_32} /></Link>
          </div>
        </div>
    </div>
  );
}

export default Main;
