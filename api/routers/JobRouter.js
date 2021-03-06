let express = require('express');
let router = express.Router();
let jobHandler = require('../controllers/JobController');

router.route('/jobs')
    .get(jobHandler.getAllJobs)
    .post(jobHandler.createJob);

router.route('/jobs/:jobId')
    .get(jobHandler.getJob)
    .put(jobHandler.updateJob)
    .delete(jobHandler.deleteJob);

router.route('/jobs/:jobId/activity/:activityId')
    .put(jobHandler.updateActivity)
    .delete(jobHandler.deleteActivity);

module.exports = router;
