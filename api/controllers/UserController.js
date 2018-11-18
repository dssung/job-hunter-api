let mongoose = require('mongoose');
let bcrypt = require('bcrypt');
let jwt = require('jsonwebtoken');

let User = mongoose.model('User');

exports.registerUser = (req, res) => {
  User.find({username: req.body.username})
    .exec()
    .then(user => {
      if (user.length >= 1) {
        return res.status(422).json({
          message: 'Username exists'
        })
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err){
            return res.status(500).json({
              error: err
            });
          }
          else {
            let user = new User({
              username: req.body.username,
              password: hash,
            });
      
            user.save()
            .then(result => {
              res.status(201).json({
                message: 'User created'
              })
            })
            .catch(err =>{
              res.status(500).json({
                error: err
              });
            });
          }
        });
      }
    })
}

exports.deleteUser = (req, res, next) => {
  User.deleteOne({_id: req.params.userId})
    .exec()
    .then(result => {
      res.status(200).json({
        message: 'User deleted'
      })
    })
    .catch(err =>{
      res.status(500).json({
        error: err
      });
    });
}

exports.loginUser = (req, res, next) => {
  User.find({ username: req.body.username })
  .exec()
  .then(user => {
    if (user.length < 1){
      return res.status(401).json({
        message: 'Auth failed'
      })
    }
    
    bcrypt.compare(req.body.password, user[0].password, (err, result) => {
      if (err){
        return res.status(401).json({
          message: 'Auth failed'
        })
      }

      if (result){
        let token = jwt.sign(
          { 
            username: user[0],
            userId: user[0]._id
          }, 
          'jobhunterjwtkey', 
          { expiresIn: '1h'}
        );

        return res.status(200).json({
          message: 'Auth succesful',
          token: token
        })
      }

      res.status(401).json({
        message: 'Auth failed'
      })
    })
  })
  .catch(err =>{
    res.status(500).json({
      error: err
    });
  });
}