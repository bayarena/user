import React from 'react';
import styles from './Category.module.sass';

import { AppContext } from '../app-context';

function Item(props:any){
  return(
    <div className={styles.item}>
      <p className={styles.itemText}>{props.name}</p>
    </div>
  )
}

function Category() {
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
        <Item name="사이클링" />
        <Item name="맨몸운동" />
        <Item name="요가" />
        <Item name="필라테스" />
        <Item name="명상" />
        <Item name="덤벨운동"/>
      </div>
    </div>
  );
}

export default Category;
