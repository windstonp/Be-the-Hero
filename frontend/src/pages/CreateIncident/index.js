import React,{useState} from 'react';
import HeroLogo from '../../assets/logo.svg';
import {Link,useHistory} from 'react-router-dom';
import {FiArrowLeft} from 'react-icons/fi';
import Api from '../../services/api';
import './style.css';
export default function NewIncident(){
  const History = useHistory();
  const NGO_id = localStorage.getItem('id');
  const [Fill,SetFill] = useState('none');
  const [title,SetTitle] = useState('');
  const [descriptions,SetDescriptions] = useState('');
  const [value,SetValue] = useState('');
  async function CreateIncident(e){
    e.preventDefault();
    const data ={
      title,
      descriptions,
      value
    }
    if(title !== '' && descriptions !== '' && value !== '' ){
      try
      {
        const result = await Api.post('/incidents',data,{
          headers: {
            authorization: NGO_id
          }
        });
        console.log(result);
        History.push('/profile');
      }
      catch(error)
      {
        alert('erro');
      }
    }else{
      SetFill('block');
    }
  }
  return (
    <div className="new-incident-container">
      <div className="content">
        <section className="infos">
          <img src={HeroLogo} alt="Be The Hero"/>
          <h1>Register a new case</h1>
          <p>Register your case for a Hero help you to solve it</p>
          <Link className="back-Link" to="/profile">
            <FiArrowLeft size={16} color='#e02041' />
            Return to the homepage.
          </Link>
        </section>
        <h1 className='mobile-title'>Register a new case</h1>
        <form onSubmit={CreateIncident}>
          <input 
            placeholder="Case Tittle"
            value = {title}
            onChange = {e=>(SetTitle(e.target.value))}
          />
          <textarea 
            placeholder='Case descriptions'
            value = {descriptions}
            onChange = {e=>(SetDescriptions(e.target.value))}
          />
          <input 
            placeholder='Reward Value'
            value = {value}
            onChange = {e=>(SetValue(e.target.value))}
          />
          <button className="button">
            Register
          </button>
          <div style={{height: 10}}>
            <p style={{display: Fill}} className='error-message'>
              Fill All The Fields
            </p>
          </div>
        </form>
        <Link className="back-link-mobile" to="/profile">
          <FiArrowLeft size={16} color='#e02041' />
          Return to the homepage.
        </Link>
      </div>
    </div>
  );
}