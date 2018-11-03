let mongoose = require('mongoose');
let Schema = mongoose.Schema;

//Schema maps to a MongoDB collection
//Defines shape of documents within that collection
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
    created_date: {
        type: Date,
        default: Date.now()
    },
    status: {
        type: String,
        enum: ['APPLIED', 'ONGOING', 'REJECTED'],
        default: 'APPLIED'
    }
});

module.exports = mongoose.model('Job', JobSchema);