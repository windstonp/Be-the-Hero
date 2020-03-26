import React from 'react';
import {Link} from 'react-router-dom';
import {FiArrowLeft} from 'react-icons/fi';
import HeroLogo from '../../assets/logo.svg';
import ErroImg from '../../assets/erro.jpg';
import './style.css';
export default function NotFound(){
  return(
    <div className="container-404">
        <img src={HeroLogo} alt="Be The Hero" className='logo-404'/>
        <img src={ErroImg} alt="404 Error"/>
        <p>Sorry <span>Hero</span> but we couldn't find that page</p>
        <Link className="back-Link" to="/profile">
          <FiArrowLeft size={16} color='#e02041' />
          Return to the homepage.
        </Link>
    </div>
  );
}