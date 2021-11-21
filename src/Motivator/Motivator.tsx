import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './Motivator.module.sass';

import { AppContext } from '../app-context';

import { SETTINGS } from '../settings';

function Item(props:any){
  return(
    <div className={styles.item}>
      <img src={props.src} alt="" />
      <p className={styles.itemText}>{props.name}</p>
    </div>
  )
}

function Motivator() {

  const [motivatorList, setMotivatorList] = useState([]);

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
        {motivatorList.map((d:any, i:number) => {
          return <Item key={i} name={d.name_eng} src={d.image} />
        })}
      </div>
    </div>
  );
}

export default Motivator;
