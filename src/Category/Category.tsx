import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './Category.module.sass';

import { AppContext } from '../app-context';

import { SETTINGS } from '../settings';

function Item(props:any){
  return(
    <div className={styles.item}>
      <img src={props.src} alt="" />
      <p>{props.name}</p>
    </div>
  )
}

function Category() {

  const [categoryList, setCategoryList] = useState([]);

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
      {categoryList.map((d:any, i:number) => {
        return <Item name={d.title} src={d.thumb} />
      })}
      </div>
    </div>
  );
}

export default Category;
