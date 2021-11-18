import React, { useState } from 'react';
import styles from './Single.module.css';

import { AppContext } from '../app-context';

function Item(props:any){
  return(
    <div
      className={styles.item}
      style={{backgroundImage: "url(https://picsum.photos/300/500?random="+ Math.floor(Math.random()*10) + ")"}}>
      <p className={styles.itemText}>{props.name}</p>
    </div>
  )
}

function Single() {
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
        <Item name="실외 라이딩" />
        <Item name="가상 경기장" />
        <Item name="그 외 서비스" />
      </div>
    </div>
  );
}

export default Single;
