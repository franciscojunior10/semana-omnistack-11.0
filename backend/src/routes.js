const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate');

const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router();

// Rotas session
// Rota para criar uma session (validação de BODY)
routes.post('/sessions', celebrate({
    [Segments.BODY]: Joi.object().keys({
        id: Joi.string().required(),
    })
}), SessionController.store);

// Rotas ongs
// Rota para criar uma ong (validação de BODY)
routes.post('/ongs', celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.string().pattern(/^[0-9]+$/, 'numbers').required().min(10).max(11),
        city: Joi.string().required(),
        uf: Joi.string().required().length(2),
    })
}), OngController.store);

// Rota para mostar as ongs cadastradas
routes.get('/ongs', OngController.index);

// Rotas incidents
// Rota para criar um incidents (validação de BODY e HEADERS)
routes.post('/incidents', celebrate({
    [Segments.BODY]: Joi.object().keys({
        title: Joi.string().required(),
        description: Joi.string().required(),
        value: Joi.number(),
    }),

    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required(),
    }).unknown(),
}), IncidentController.store);

// Rota para mostrar os incidents (validação de QUERY)
routes.get('/incidents', celebrate({
    [Segments.QUERY]: Joi.object().keys({
        page: Joi.number(),
    })
}), IncidentController.index);

// Rota para deletar um incident (validação de PARAMS e HEADERS)
routes.delete('/incidents/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required(),
    }),

    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required(),
    }).unknown(),
}), IncidentController.delete);

// Rota para atualizar um incident (validação de PARAMS e HEADERS)
routes.put('/incidents/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required(),
    }),

    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required(),
    }).unknown(),
}), IncidentController.update);

// Rotas profile
// Rota para buscar todos os casos daquela ong
routes.get('/profile', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required(),
    }).unknown(),
}), ProfileController.index);

// Rota para buscar um caso especifico daquela ong
routes.get('/profile/:id', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required(),
    }).unknown(),

    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required(),
    })
}), ProfileController.show);

module.exports = routes;