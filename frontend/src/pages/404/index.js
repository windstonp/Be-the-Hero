import React from 'react';
import ErroImg from '../../assets/erro.svg';
import './style.css';
export default function NotFound(){
  return(
    <div className="container-404">
        <img src={ErroImg} alt="404 Error"/>
        <p>Sorry Hero but we couldn't find that page</p>
    </div>
  );
}