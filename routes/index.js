var express = require('express');
var router = express.Router();
var peopleModel = require('../model/people');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
