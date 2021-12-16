import React, { useState, useEffect } from 'react';

import { Link } from "react-router-dom";

import styles from './Header.module.sass';

import logo from './logo.png';
import calendar from './calendar.png';
import info from './info.png';
import setting from './setting.png';

function Header(){

  const [time, setTime] = useState("");

  useEffect(() => {
    var timerId = setInterval(()=>{
      // Get current time and format
      const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
      const dayNames = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
      let d = new Date();
      let str = [
        dayNames[d.getDay()],
        monthNames[d.getMonth()],
        d.getDate(),
        d.getHours() % 12 + ":" + String(d.getMinutes()).padStart(2, "0"),
        d.getHours() > 12 ? "PM" : "AM"];
      setTime(str.join(" "));
    }, 1000);

    return () => {
      console.log("bye");
      clearInterval(timerId);
    }
  }, []);

  return (
    <div className={styles.header}>
      <Link to="/">
        <img alt="" src={logo} />
      </Link>

      <ul>
        <li><img alt="" className={styles.userIcon} src="https://picsum.photos/200" /></li>
        <li>CHARLIE85</li>
        <li><img alt="" src={calendar} /></li>
        <li><img alt="" src={info} /></li>
        <li><img alt="" src={setting} /></li>
        <li>{time}</li>
      </ul>
    </div>
  );
}

export default Header;
