import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './Category.module.sass';

import { AppContext } from '../app-context';

import { SETTINGS } from '../settings';

import Detail from './Detail';

function Item(props:any){
  return(
    <div className={styles.item} onClick={()=>props.onClick()}>
      <img src={props.src} alt="" />
      <p>{props.name}</p>
    </div>
  )
}

function Main(props:any){
    return(
      <div>
        {props.list.map((d:any, i:number) => {
          return <Item key={i} name={d.title} src={d.thumb} onClick={()=>props.onClick(d.id)} />
        })}
      </div>
    );
}

function Category() {

  const [categoryList, setCategoryList] = useState([]);
  const [page, setPage] = useState(-1);

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

  const setContent = (n:number) => {
    switch(n){
      case -1 : return <Main list={categoryList} onClick={(n:number) => setPage(n)}/>
      default : return <Detail category={n} />
    }
  }  

  return (
    <div className={styles.root}>
      <AppContext.Consumer>
      {({changePage}) => (
        <div className={styles.left}>
          <span
            className={styles.leftArrow}
            onClick={()=>{
              if(page === -1) changePage('MAIN');
              else setPage(-1);
            }}></span>
        </div>
      )}
      </AppContext.Consumer>

      <div className={styles.right}>
      {setContent(page)}
      </div>
    </div>
  );
}

export default Category;
