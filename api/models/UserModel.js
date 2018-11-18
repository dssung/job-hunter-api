let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let Job = require('./JobModel').JobSchema;

let UserSchema = new Schema ({
  username: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true
  },

  jobs: [Job]
});

module.exports = mongoose.model('User', UserSchema);