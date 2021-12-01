import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './Detail.module.sass';

import { SETTINGS } from '../settings';
import type { T_motivator, T_lecture } from '../settings';

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

	const getSubTitle = () => {
	    let diff = "초급";
	    switch(props.data.difficulty){
	      case 1 : diff = "중급"; break;
	      case 2 : diff = "고급"; break;
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
		  		<p>{props.data.title}</p>
		  		<p>{getSubTitle()}</p>
		  		<p>{getDateString()}</p>
		  	</div>
		</div>
	);
}

function Detail(props:any) {

	const [motivator, setMotivator] = useState(emptyData);

	useEffect(()=>{
		axios.get(SETTINGS.REST_URL + "/motivators/" + props.motivator + "/")
		  .then((res)=> {
		  	if(res.status === 200){
		  		setMotivator(res.data);
			}
		});		
	}, []);

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