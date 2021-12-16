import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './Motivator.module.sass';

import {
  Link,
  Routes,
  Route,
  useLocation } from "react-router-dom";

import { SETTINGS } from '../settings';

import Detail from './Detail';

function Item(props:any){
  return(
    <div className={styles.item}>
      <img src={props.src} alt="" />
      <p className={styles.itemText}>{props.name}</p>
    </div>
  )
}

function Main(props:any){
    return(
      <div>
        {props.list.map((d:any, i:number) => {
          return(
            <Link key={i} to={"" + d.id}>
              <Item name={d.name_eng} src={d.image} />
            </Link>
            );
        })}
      </div>
    );
}

function Motivator(props:any) {

  const [motivatorList, setMotivatorList] = useState([]);
  const location = useLocation();

  useEffect(()=>{
    axios.get(SETTINGS.REST_URL + "/motivators/")
      .then((res)=> {
        if(res.status === 200){

          let motList = res.data.results.reduce((acc:any, curr:any, idx:number)=>{
            let mot = {
              name_eng: curr.name_eng,
              name_kor: curr.name_kor,
              image: curr.image,
              id: curr.id
            };
            acc.push(mot);
            return acc;
          }, []);

          setMotivatorList(motList);

        }
    });
  }, []);

  const getLocation = () =>{
    if(location.pathname.split('/').length > 2) return "";
    else return "/";
  }

  return (
    <div className={styles.root}>

      <div className={styles.left}>
        <Link to={getLocation()}>
          <span className={styles.leftArrow}></span>
        </Link>
      </div>

      <div className={styles.right}>
        <Routes>
          <Route path="" element={<Main list={motivatorList} />} /> 
          <Route path=":id" element={<Detail />} />
        </Routes>
      </div>
    </div>
  );
}

export default Motivator;
