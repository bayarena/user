import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { SETTINGS } from '../settings';
import type { T_lecture } from '../settings';

import { useParams } from "react-router-dom";

const emptyData:T_lecture = {
  id: 0,

  title: "",
  date: "",
  image: "",

  category: undefined,
  description: "",
  theme: "",
  time: 0,
  difficulty: 0,
  motivators: [],

  thumbs: [],
};

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
		<div>{props.category}</div>
	);
}

export default Detail;