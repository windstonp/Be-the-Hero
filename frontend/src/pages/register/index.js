import React,{useState} from "react";
import { Link, useHistory } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import Api from '../../services/api';
import HeroLogo from '../../assets/logo.svg';
import './style.css';
export default function Register(){
  const [Fill,SetFill] = useState('none');
  const [name,Setname] = useState('');
  const [email,SetEmail] = useState('');
  const [whatsapp,SetWhatsapp] = useState('');
  const [city,SetCity] = useState('');
  const [UF,SetUF] = useState('');
  const History = useHistory();
  async function handleRegister(e){
    e.preventDefault();
    const data = {
      name,
      email,
      whatsapp,
      city,
      UF
    };
    if(name !== '' && email !== '' && whatsapp !== '' && city !== '' && UF !== ''){
      try{
        const result = await Api.post('/NGO',data);
        alert(`Your access ID is: ${result.data.id} `);
        History.push('/');
      }catch(err){
        alert('error, try again later.');
      }
    }
    else{
      SetFill('block');
    }
  }
  return(
    <div className="register-container">
      <div className="content">
        <section className='infos'>
          <img src={HeroLogo} alt="Be The Hero"/>
          <h1>Sign-Up</h1>
          <p>Sign Up and Log in to help other people to find your NGO's case</p>
          <Link className="back-Link" to="/">
            <FiArrowLeft size={16} color='#e02041' />
            Already have a account? Log-In
          </Link>
        </section>
        <h1 className='mobile-title'>Sign-Up</h1>
        <form onSubmit={handleRegister}>
          <input 
            placeholder = "Name of the NGO"
            value = {name}
            onChange = {e=>Setname(e.target.value)}
          />
          <input 
            type="email" 
            placeholder='E-mail'
            value = {email}
            onChange = {e=>SetEmail(e.target.value)}
          />
          <input 
            placeholder='whatsapp'
            value = {whatsapp}
            onChange = {e=>SetWhatsapp(e.target.value)}
          />
          <div className='inputGroup'>
            <input 
              placeholder='city'
              value = {city}
              onChange = {e=>SetCity(e.target.value)}
            />
            <input placeholder='uf' 
              style={{width: 80}}
              value = {UF}
              onChange = {e=>SetUF(e.target.value)}
            />
          </div>
          <button className="button" style={{marginTop: 58}}>
            Register
          </button>
          <div style={{height: 10}}>
            <p style={{display: Fill}} className='error-message'>
              Fill All The Fields
            </p>
          </div>
        </form>
        <Link className="back-link-mobile" to="/">
          <FiArrowLeft size={16} color='#e02041' />
          Already have a account? Log-In
        </Link>
      </div>
    </div>
  );
}