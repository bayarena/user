import React, { useState, useEffect } from 'react';
import styles from './Detail.module.sass';
import axios from 'axios';

import { SETTINGS } from '../settings';
import type { T_category, T_lecture } from '../settings';

import { useParams } from "react-router-dom";

const emptyData:T_category = {
  id: 0,

  title: "",
  thumb: "",
  lectures: [],
};

function Item(props:T_lecture){

	const getSubTitle = () => {
	    let diff = "초급";
	    switch(props.difficulty){
	      case 1 : diff = "중급"; break;
	      case 2 : diff = "상급"; break;
	    }

	    return diff + " | " + props.time + "min | " + props.theme;
  }

  const getDateString = () => {
  	let date = props.date.replace('Z', '').split('T');

	  let time_split = date[1].split(':');

	  let time_hour = Number(time_split[0]);
	  let new_time_str = "";

	  if(time_hour > 21){
	  	new_time_str = (time_hour - 12) + ":" + time_split[1] + "pm";
	  }else if(time_hour > 12){
	  	new_time_str = "0" + (time_hour - 12) + ":" + time_split[1] + "pm";
	  }else if(time_hour > 11){
	  	new_time_str = "12:" + time_split[1] + "pm";
	  }else if(time_hour > 9){
	  	new_time_str = time_hour + ":" + time_split[1] + "am";
	  }else{
	  	new_time_str = "0" + time_hour + ":" + time_split[1] + "am";
	  }

	  return(
	  	<div>
	  		<p>{date[0]}</p>
	  		<p>{"@" + new_time_str}</p>
	  	</div>
	  );
  }  

	return(
		<div className={styles.Item}>
			{getDateString()}
			<div>
				<img src={SETTINGS.REST_URL + props.thumbs[0]} alt="" />
				<p>이름</p>
			</div>
			<p>{props.title}</p>
			<p>{getSubTitle()}</p>
		</div>
	);
}

function Detail(props:any) {

	const [category, setCategory] = useState(emptyData);
	let params = useParams();

	useEffect(()=>{
		axios.get(SETTINGS.REST_URL + "/category/" + params.id + "/")
		  .then((res)=> {
		  	if(res.status === 200){
		  		setCategory(res.data);
		  		console.log(res.data);
			}
		});		
	}, [params.id]);

	return(
		<div className={styles.root}>
			<div className={styles.header}>
				{category.title}
			</div>

			<div className={styles.content}>
				{category.lectures.map((d:T_lecture, i:number) => {
					return(<Item key={i} {...d} />);
				})}
			</div>
		</div>
	);
}

export default Detail;