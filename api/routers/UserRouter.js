let express = require('express');
let router = express.Router();
let userHandler = require('../controllers/UserController');

router.route('/user/register')
  .post(userHandler.registerUser);

router.route('/user/:userId')
  .delete(userHandler.deleteUser);

router.route('/user/login')
  .post(userHandler.loginUser);

module.exports = router;