import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './Detail.module.sass';

import { SETTINGS } from '../settings';
import type { T_motivator, T_lecture } from '../settings';

import { useParams } from "react-router-dom";

const emptyData:T_motivator = {
  id: 0,
  
  name_kor: "",
  name_eng: "",
  description: "",
  image: "",
  image_thumb: "",
  lectures: [],
};

function Item(props:any){

  const getDiff = () => {
    switch(props.data.difficulty){
      case 1 : return "중급"
      case 2 : return "상급"
      default : return "초급"
    }
  }

  const getDiffColor = () => {
    switch(props.data.difficulty){
      case 1 : return "#2196f3";
      case 2 : return "#e91e63";
      default : return "#8bc34a";
    }
  }

	const getSubTitle = () => {
	    let diff = "초급";
	    switch(props.data.difficulty){
	      case 1 : diff = "중급"; break;
	      case 2 : diff = "상급"; break;
	    }

	    return diff + " | " + props.data.time + "min | " + props.data.theme;
  	}

  	const getDateString = () => {
  		let date = props.data.date.replace('Z', '').split('T');

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

  		return date[0] + " @" + new_time_str;
  	}

	return(
		<div
		  className={styles.item}
		  style={{
		  	background: "url('" + SETTINGS.REST_URL + props.data.image + "')",
		  	backgroundSize: "cover"
		  }}>
		  	<div>
		  		<p style={{background: getDiffColor()}}>{getDiff()}</p>
		  		<p>{props.data.time + "min | " + props.data.theme}</p>
		  		<div>
			  		<p>{props.data.title}</p>
			  		<p>{getDateString()}</p>
		  		</div>
		  	</div>
		</div>
	);
}

function Detail() {

	const [motivator, setMotivator] = useState(emptyData);
	let params = useParams();

	useEffect(()=>{
		axios.get(SETTINGS.REST_URL + "/motivators/" + params.id + "/")
		  .then((res)=> {
		  	if(res.status === 200){
		  		setMotivator(res.data);
			}
		});		
	}, [params.id]);

	return(
		<div>
			<div className={styles.header}>
				<img src={motivator.image} alt="" />
				<p>{motivator.name_kor}</p>
				<p>{motivator.description}</p>
			</div>

			<div className={styles.content}>
				{motivator.lectures.map((d:T_lecture, i:number) => {
					return <Item data={d} key={i} />
				})}
			</div>
		</div>
	);
}

export default Detail;