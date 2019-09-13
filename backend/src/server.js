const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const cors = require('cors');

const server = express();

server.use(cors());

mongoose.connect('mongodb+srv://teste:teste@cluster0-hpyzw.mongodb.net/test?retryWrites=true&w=majority',{
    useNewUrlParser: true
});

server.use(express.json());

server.use(routes);

server.listen(3333);