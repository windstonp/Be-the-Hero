const express = require('express');
const routes = express.Router();
const NGOControler = require('./controllers/NGOcontroller');
const incidentController = require('./controllers/IncidentControler');
const ProfileIncidentController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

routes.post('/session',SessionController.Create);

routes.get('/NGO',NGOControler.NGOList);
routes.post('/NGO',NGOControler.Create);

routes.post('/incidents',incidentController.Create);
routes.get('/incidents',incidentController.ListIncident);
routes.delete('/incidents/:id',incidentController.DeleteIncident);

routes.get('/profile',ProfileIncidentController.GetProfile);

module.exports = routes;