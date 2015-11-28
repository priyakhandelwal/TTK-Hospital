var express = require('express');
var router = express.Router();
var peopleModel = require('../model/people');
var addPatientInfo = require('../middleware/addPatientInfo');

/* GET home page. */
router.get('/', function(req, res, next) {
  //res.render('index', { title: 'Express' });
  res.sendFile(__dirname + "../public/index.html");
});



router.post('/addEntry', function(req, res, next){
	addPatientInfo.addNewPatientInformation(req, res);
});

module.exports = router;
