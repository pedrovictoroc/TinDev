const express = require('express');

const DevController = require('./Controller/DevController');
const LikeController = require('./Controller/LikeController');
const DislikeController = require('./Controller/DislikeController');

const routes = express.Router();

routes.get('/teste',(req,res) =>{
    return res.send('It Works!');
});

routes.get('/devs', DevController.index);

routes.post('/devs', DevController.store);

routes.post('/devs/:devId/likes', LikeController.store);
routes.post('/devs/:devId/dislikes', DislikeController.store);

module.exports = routes;