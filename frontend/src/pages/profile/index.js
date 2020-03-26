import React, {useEffect, useState} from "react";
import {Link,useHistory} from 'react-router-dom';
import {FiPower,FiTrash2} from 'react-icons/fi';
import HeroLogo from '../../assets/logo.svg';
import Api from '../../services/api';
import './style.css';
import api from "../../services/api";
export default function Profile(){
  const NGO_name = localStorage.getItem('name');
  const NGO_id = localStorage.getItem('id');
  const [Incidents,SetIncidents] = useState([]);
  const History = useHistory();
  useEffect(()=>{
    Api.get('/profile',{
      headers: {authorization: NGO_id},
    }).then(response=>{
      SetIncidents(response.data);
    });
  },[NGO_id])

  async function handleDeleteIncident(id){
    try{
      await api.delete(`/incidents/${id}`,{
        headers:{
          authorization: NGO_id
        }
      })
      SetIncidents(Incidents.filter(Incidents=>Incidents.id !== id));
    }
    catch(error){
      alert('something unexpected happened');
    }
  }
  function HandleLogout(){
    localStorage.clear();
    History.push('/');
  }
  return(
    <div className="profile-container">
      <header>
        <img src={HeroLogo} alt="Be The Hero"/>
        <span>Welcome, {NGO_name}</span>
        <Link to='incidents/new' className='button'>Registrate New case</Link>
        <button onClick={HandleLogout}>
          <FiPower size={18} color='#e02041'></FiPower>
        </button>
      </header>
      <h1>
        Registered Cases
      </h1>
      <ul>
        {Incidents.map(Incident=>
          (
            <li key={Incident.id}>
              <strong>CASE:</strong>
              <p>{Incident.title}</p>
              <strong>Description:</strong>
              <p>{Incident.descriptions}</p>
              <strong>Reward Value:</strong>
              <p>{Intl.NumberFormat('eng',{style: 'currency',currency: 'USD'}).format(Incident.value)}</p>
              <button type='button' onClick={()=>handleDeleteIncident(Incident.id)}>
              <FiTrash2 size={20} color='#e02041'/>
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
}