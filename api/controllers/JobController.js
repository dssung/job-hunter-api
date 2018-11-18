let mongoose = require('mongoose');
let checkAuth = require('../middleware/checkAuth');

/* Create model
Model is a class with which we construct documents (jobs)
*/
let User = mongoose.model('User');

//GET
exports.getAllJobs = (checkAuth, (req, res) => {
	User.findOne({_id: req.params.userId}, (err, user) => {
    if (err){
      res.status(401).json({
          message: 'User not found'
      });
    } else {
			res.json(user.jobs);	
    }
	});
});

//POST
exports.createJob = (checkAuth, (req, res) => {
	User.findOne({_id: req.params.userId}, (err, user) => {
    if (err){
      res.status(401).json({
          message: 'User not found'
      });
    } else {
			user.jobs.push(req.body);

			user.save((err) => {
				if (err){
					res.json({
						error: err
					})
				}
				
				res.json({
					message: "Job added"
				})	
			})
    }
	});
});

//GET
exports.getJob = (checkAuth, (req, res) => {
	User.findOne({_id: req.params.userId}, (err, user) => {
    if (err){
      res.status(401).json({
          message: 'User not found'
      });
    } else {
			let job = user.jobs.id(req.params.jobId);
			res.json(job);
    }
	});
});

//PUT
exports.updateJob = (checkAuth, (req, res) => {
	User.findOne({_id: req.params.userId}, (err, user) => {
    if (err){
      res.status(401).json({
          message: 'User not found'
      });
    } else {
			let job = user.jobs.id(req.params.jobId);
			job.set(req.body);
			user.save((err) => {
				if (err){
					res.json({
						error: err
					})
				}
				
				res.json(job);	
			})
    }
	});
});

//DELETE
exports.deleteJob = (checkAuth, (req, res) => {
	User.findOne({_id: req.params.userId}, (err, user) => {
    if (err){
      res.status(401).json({
          message: 'User not found'
      });
    } else {
			let job = user.jobs.remove(req.params.jobId);
			job.set(req.body);
			user.save((err) => {
				if (err){
					res.json({
						error: err
					})
				}
				
				res.json({
					message: 'Job Deleted'
				});	
			})
    }
	});
});

exports.deleteActivity = (checkAuth, (req, res) => {
	User.findOne({_id: req.params.userId}, (err, user) => {
    if (err){
      res.status(401).json({
          message: 'User not found'
      });
    } else {
			let job = user.jobs.id(req.params.jobId);
			let activity = job.activity_log.id(req.params.activityId);
			activity.remove();
			user.save((err) => {
				if (err){
					res.json({
						error: err
					})
				}
				
				res.json({
					message: 'Activity Deleted'
				});	
			})
    }
	});
});

exports.updateActivity = (checkAuth, (req, res) => {
    User.findOne({_id: req.params.userId}, (err, user) => {
    if (err){
      res.status(401).json({
          message: 'User not found'
      });
    } else {
			let job = user.jobs.id(req.params.jobId);
			let activity = job.activity_log.id(req.params.activityId);
			activity.set(req.body);
			
			user.save((err) => {
				if (err){
					res.json({
						error: err
					})
				}
				
				res.json({
					message: 'Activity Updated'
				});	
			})
    }
	});
});

