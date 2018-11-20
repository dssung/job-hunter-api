let express = require('express');
let router = express.Router();
let indeedHandler= require('../controllers/IndeedController');

router.route('/indeedJobSearch')
    .get(indeedHandler.getJobs);


module.exports = router;
