let mongoose = require('mongoose');

/* Create model
Model is a class with which we construct documents (jobs)
*/
let Job = mongoose.model('Job');

//GET
exports.getAllJobs = (req, res) => {
    Job.find((err, jobs) => {
        if (err)
            res.send(err);
        
        res.json(jobs)
    })
};

//POST
exports.createJob = (req, res) => {
    let newJob = new Job(req.body);
    
    newJob.save((err, job) => {
        if (err)
            res.send(err);
        
        res.json(job);
    })
};

//GET
exports.getJob = (req, res) => {
    Job.findById(req.params.jobId, (err, job) => {
        if (err)
            res.send(err);
        
        res.json(job)
    })
};

//PUT
exports.updateJob = (req, res) => {
    
    Job.findByIdAndUpdate(req.params.jobId, req.body, {new: true}, (err, job) => {
        if (err) 
            res.send(err);
        
        res.json(job); 
    })
};

//DELETE
exports.deleteJob = (req, res) => {
    Job.deleteOne({_id: req.params.jobId}, (err) => {
        if (err)
            res.send(err);
        
        res.send(`Job Id ${req.params.jobId} succesfully deleted`)
    });
};

exports.deleteActivity = (req, res) => {
    Job.findById(req.params.jobId, (err, job) => {
        if (err)
            res.send(err);
        
        if (job){
            let activity = job.activity_log.id(req.params.activityId);
            activity.remove();

            job.save((err) => {
                if (err)
                    res.send(error);
            })
        }

        res.send(job);
    });

}

exports.updateActivity = (req, res) => {
    Job.findById(req.params.jobId, (err, job) => {
        if (err)
            res.send(err);
        
        if (job){
            let activity = job.activity_log.id(req.params.activityId);
            activity.set(req.body);

            job.save((err) => {
                if (err)
                    res.send(error);
            })
        }

        res.send(job);
    });
}

