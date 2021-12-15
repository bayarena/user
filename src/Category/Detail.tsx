import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { SETTINGS } from '../settings';
import type { T_lecture } from '../settings';

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

	useEffect(()=>{
		axios.get(SETTINGS.REST_URL + "/category/" + props.category + "/")
		  .then((res)=> {
		  	if(res.status === 200){
		  		setCategory(res.data);
		  		console.log(res.data);
			}
		});		
	}, []);

	return(
		<div>{props.category}</div>
	);
}

export default Detail;