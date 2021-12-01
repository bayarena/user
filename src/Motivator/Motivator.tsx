import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './Motivator.module.sass';

import { AppContext } from '../app-context';

import { SETTINGS } from '../settings';

import Detail from './Detail';

function Item(props:any){
  return(
    <div className={styles.item} onClick={()=>props.onClick()}>
      <img src={props.src} alt="" />
      <p className={styles.itemText}>{props.name}</p>
    </div>
  )
}

function Main(props:any){
    return(
      <div>
        {props.list.map((d:any, i:number) => {
          return <Item key={i} name={d.name_eng} src={d.image} onClick={()=>props.onClick(d.id)} />
        })}
      </div>
    );
}

function Motivator() {

  const [motivatorList, setMotivatorList] = useState([]);
  const [page, setPage] = useState(-1);

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

  const setContent = (n:number) => {
    switch(n){
      case -1 : return <Main list={motivatorList} onClick={(n:number) => setPage(n)}/>
      default : return <Detail motivator={n} />
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

export default Motivator;
