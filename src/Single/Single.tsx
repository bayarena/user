import React from 'react';
import styles from './Single.module.sass';

import { Link } from "react-router-dom";

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
      <div className={styles.left}>
        <Link to="/">
          <span className={styles.leftArrow}></span>
        </Link>
      </div>

      <div className={styles.right}>
        <Item name="실외 라이딩" />
        <Item name="가상 경기장" />
        <Item name="그 외 서비스" />
      </div>
    </div>
  );
}

export default Single;
