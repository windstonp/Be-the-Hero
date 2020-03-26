import { BrowserRouter, Route, Switch } from 'react-router-dom';
import React from "react";
import Logon from './pages/logon';
import Register from "./pages/register";
import NotFound from "./pages/404";
import Profile from "./pages/profile";
import CreateIncident from './pages/CreateIncident';
export default function Routes(){
  return(
    <BrowserRouter>
      <Switch>
        <Route path='/' exact component={Logon}/>
        <Route path='/register' component={Register} />
        <Route path='/profile' component={Profile}/>
        <Route path='/Incidents/new' component={CreateIncident}/>
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
}