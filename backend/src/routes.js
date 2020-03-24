const express = require('express');
const routes = express.Router();
const NpoControler = require('./controllers/NPOcontroller');
const incidentController = require('./controllers/IncidentControler');
const ProfileIncidentController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

routes.post('/session',SessionController.Create);

routes.get('/NPO',NpoControler.NpoList);
routes.post('/NPO',NpoControler.Create);

routes.post('/incidents',incidentController.Create);
routes.get('/incidents',incidentController.ListIncident);
routes.delete('/incidents/:id',incidentController.DeleteIncident);

routes.get('/profile',ProfileIncidentController.GetProfile);

module.exports = routes;