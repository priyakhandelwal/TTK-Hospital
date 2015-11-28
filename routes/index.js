var express = require('express');
var router = express.Router();
var peopleModel = require('../model/people');

/* GET home page. */
router.get('/', function(req, res, next) {
  //res.render('index', { title: 'Express' });
  res.sendFile(__dirname + "../public/index.html");
});

module.exports = router;
