const express = require('express');
const mongoose = require('mongoose');
const Job = require('./api/models/JobModel');
const bodyParser = require('body-parser');
const config = require('config');

//db options
let options = { 
    server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 }}, 
    replset: { socketOptions: { keepAlive: 1, connectTimeoutMS : 30000 }},
    useNewUrlParser: true, 
    useFindAndModify: false 
  }; 

//Routers
let jobRouter = require('./api/routers/JobRouter');

const app = express();
const port = process.env.PORT || 8000;

mongoose.Promise = global.Promise;
mongoose.connect(config.DBHost, options);

//body-parser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//Load Routers
app.use(jobRouter);

/*404 Handler Middleware
app.use((req, res) => {
    res.status(404).send({url: req.originalUrl + ' not found'});
});*/

app.listen(port, () => {
    console.log('App running on ' + port);
});

//For testing
module.exports = app;
