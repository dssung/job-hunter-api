let mongoose = require('mongoose');
let Schema = mongoose.Schema;

//Schema maps to a MongoDB collection
//Defines shape of documents within that collection

let ActivitySchema = new Schema({
    activity_type: {
        type: String,
        enum: ['EMAIL_RECEIVED', 'PHONE_CALL', 'PHONE_INTERVIEW', 'ONSITE_INTERVIEW', 'OFFER', 'FOLLOWED_UP']
    },

    date: {
        type: Date,
        default: Date.now()
    },

    notes: {
        type: String,
        default: '',
    }
});

let JobSchema = new Schema({
    company: {
        type: String,
        required: 'Please enter the company of the job'
    },
    position: {
        type: String,
        required: 'Please enter the position name'
    },
    location: {
        type: String,
        required: 'Enter City of position'
    },
    
    applied_date: {
        type: Date,
    },

    skills: {
        type: [String]
    },

    notes: {
        type: String,
        default: ''
    },

    url: {
        type: String
    },

    created_date: {
        type: Date,
        default: Date.now()
    },

    activity_log: [ActivitySchema],

    status: {
        type: String,
        enum: ['INTERESTED', 'APPLIED', 'IN_PROGRESS', 'REJECTED'],
        default: 'APPLIED'
    }
});

module.exports = mongoose.model('Job', JobSchema);
module.exports = mongoose.model('Activity', ActivitySchema);