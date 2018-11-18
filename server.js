const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('config');
const cors = require('cors');

//db options
let options = { 
    useNewUrlParser: true, 
    useFindAndModify: false 
  };

//Models
const Job = require('./api/models/JobModel');
const User = require('./api/models/UserModel');

//Routers
let jobRouter = require('./api/routers/JobRouter');
let userRouter = require('./api/routers/UserRouter');

const app = express();
const port = process.env.PORT || 8000;

app.use(cors());

mongoose.Promise = global.Promise;
mongoose.connect(config.DBHost, options);

if (config.util.getEnv('NODE_ENV') === 'test') {
   console.log('In test environment');
} else {
    console.log('In dev env');
}

//body-parser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
//app.use(bodyParser.text());
//app.use(bodyParser.json({ type: 'application/json'}));


//Load Routers
app.use(jobRouter);
app.use(userRouter);

/*404 Handler Middleware
app.use((req, res) => {
    res.status(404).send({url: req.originalUrl + ' not found'});
});*/

app.listen(port, () => {
    console.log('App running on ' + port);
});

//For testing
module.exports = app;
