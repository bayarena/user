import React, { useState, useEffect } from 'react';
import styles from './Play.module.sass';

import { useNavigate } from "react-router-dom";

function Play(){
	let navigate = useNavigate();

	const [cadence, setCadence] = useState(0);
	const [distance, setDistance] = useState(0);

	useEffect(() => {
		var webSocket = new WebSocket("ws://localhost:9999");
		var intervalId = setInterval(()=>{
			webSocket.send("A");
		}, 100);

		webSocket.onopen = function(message){
			webSocket.send("B");
			console.log("Server connect...");
		};

		webSocket.onclose = function(message){
			console.log("Server Disconnect...");
		};

		webSocket.onerror = function(message){
			console.log("error...");
		};

		webSocket.onmessage = function(message){
			//console.log("Recieve From Server => "+message.data);
			setCadence(parseFloat(message.data.split(',')[0]) / 100);
			setDistance(parseFloat(message.data.split(',')[1]) / 1000 * 0.01);
		};

		return function cleanup(){
			webSocket.close();
			clearInterval(intervalId);
		};

	}, []);

	return(
		<div className={styles.root}>
			<div className={styles.left}>
			    <span onClick={()=>navigate(-1)} className={styles.leftArrow}></span>
			</div>

			<div className={styles.state}>
				<div>
					<p>CADENCE</p>
					<p>{cadence.toFixed(3)} rps</p>
				</div>
				<div>
					<p>DISTANCE</p>
					<p>{distance.toFixed(3)} km</p>
				</div>
				<div>
					<p>CALORIES</p>
					<p>0 kcal</p>
				</div>
				<div>
					<p>LOAD</p>
					<p>0 %</p>
				</div>
			</div>
		</div>
	);
}

export default Play;