import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {FiLogIn} from 'react-icons/fi'
import './styles.css';
import HeroLogo from '../../assets/logo.svg';
import HeroesImg from '../../assets/heroes.png';
import Api from '../../services/api';
export default function Logon(){
  const [id,SetID] = useState('');
  const [NotFind,SetNotFind] = useState('none');
  const History = useHistory();
  async function HandleLogin(e){
    e.preventDefault();
    if (id !== '') {
      try{
          const result = await Api.post('/session',{id});
          localStorage.setItem('id',id);
          localStorage.setItem('name',result.data.name);
          History.push('/profile');
        }
      catch(error)
        {
          SetNotFind('block');
        }
      }else{
        SetNotFind('block');
      }
  }
  return(
    <div className="logon-container">
      <section className="form">
        <img src={HeroLogo} alt="Be The Hero"/>
        <form onSubmit={HandleLogin}>
          <h1>Log-In</h1>
          <input 
            placeholder="ID"
            value = {id}
            onChange = {e=>SetID(e.target.value)}
          />
          <button className="button" type="submit">Log-In</button>
          <div style={{height: 10}}>
            <p style={{display: NotFind}} className='error-message'>
              NGO Not Found
            </p>
          </div>
          <Link className="back-Link" to="/register">
            <FiLogIn size={16} color='#e02041' />
            Don't have a account? Sign-Up
          </Link>
        </form>
      </section>
      <img src={HeroesImg} alt="Heroes"/>
    </div>
  );
}