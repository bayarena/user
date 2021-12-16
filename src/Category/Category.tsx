import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './Category.module.sass';

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
      <p>{props.name}</p>
    </div>
  )
}

function Main(props:any){
    return(
      <div>
        {props.list.map((d:any, i:number) => {
          return(
            <Link key={i} to={"" + d.id}>
              <Item name={d.title} src={d.thumb} />
            </Link>);
        })}
      </div>
    );
}

function Category() {

  const [categoryList, setCategoryList] = useState([]);
  const location = useLocation();

  useEffect(()=>{
    axios.get(SETTINGS.REST_URL + "/category/")
      .then((res)=> {
        if(res.status === 200){

          let catList = res.data.results.reduce((acc:any, curr:any, idx:number)=>{
            let cat = {
              id: curr.id,
              title: curr.title,
              thumb: curr.thumb
            };
            acc.push(cat);
            return acc;
          }, []);

          setCategoryList(catList);

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
          <Route path="" element={<Main list={categoryList} />} /> 
          <Route path=":id" element={<Detail />} />
        </Routes>
      </div>
    </div>
  );
}

export default Category;
