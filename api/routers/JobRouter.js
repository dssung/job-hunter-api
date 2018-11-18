let express = require('express');
let router = express.Router();
let jobHandler = require('../controllers/JobController');
let checkAuth = require('../middleware/checkAuth');

router.use(checkAuth);

router.route('/user/:userId/jobs')
    .get(jobHandler.getAllJobs)
    .post(jobHandler.createJob);

router.route('/user/:userId/jobs/:jobId')
    .get(jobHandler.getJob)
    .put(jobHandler.updateJob)
    .delete(jobHandler.deleteJob);

router.route('/user/:userId/jobs/:jobId/activity/:activityId')
    .put(jobHandler.updateActivity)
    .delete(jobHandler.deleteActivity);

module.exports = router;
