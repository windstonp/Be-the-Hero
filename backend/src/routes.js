const express = require('express');
const { celebrate, Joi, Segments } = require('celebrate');
const routes = express.Router();
const NGOControler = require('./controllers/NGOcontroller');
const incidentController = require('./controllers/IncidentControler');
const ProfileIncidentController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

routes.post('/session',celebrate({
  [Segments.BODY]: Joi.object().keys({
    id: Joi.string().required(),
  })
}),SessionController.Create);

routes.get('/NGO',NGOControler.NGOList);

routes.post('/NGO',celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().required().email(),
    whatsapp: Joi.string().required().min(10).max(11),
    city: Joi.string().required(),
    UF: Joi.string().required().length(2),
  }) 
}),NGOControler.Create);
routes.post('/incidents',celebrate({
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required(),
  }).unknown(),
  [Segments.BODY]: Joi.object().keys({
    title: Joi.string().required(),
    descriptions: Joi.string().required(),
    value: Joi.number().required().min(0),
  }),
}),incidentController.Create);
routes.get('/incidents',celebrate({
  [Segments.QUERY]: Joi.object().keys({
    page: [Joi.number().optional(), Joi.allow(null)] 
  })
}),incidentController.ListIncident);
routes.delete('/incidents/:id',celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.number().required()
  })
}),incidentController.DeleteIncident);

routes.get('/profile',celebrate({
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required(),
  }).unknown(),
}),ProfileIncidentController.GetProfile);

module.exports = routes;