import s from './Home.module.scss';
import React from 'react';
// import { useContext, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
// import { UserContext } from '../../contexts/UserContext';

export default function Home() {
    // const {userData} = useContext(UserContext);
    const navigate = useNavigate();

    // useEffect(() => {
    //     if(userData.email === undefined) {
    //         navigate('/');
    //         return;
    //     }
    // })

  return (
    <div id={s.home}>
      <div id={s.title}>
        Hello <span>Name</span>
      </div>
      <div id={s.btns}>
        <div className={s.btn} onClick={() => {navigate("/learn")}}>
          Learn
        </div>
        <div className={s.btn} onClick={() => {navigate("/practice")}}>
          Practice
        </div>
      </div>
    </div>
  )
}