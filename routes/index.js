var express = require('express');
var router = express.Router();
var peopleModel = require('../model/people');
var patientMiddleware = require('../middleware/people');
var callUpdateMiddleware = require('../middleware/call');

/* GET home page. */
router.get('/', function(req, res, next) {
  //res.render('index', { title: 'Express' });

 res.sendFile(__dirname + "../public/index.html");
});



router.post('/people', function(req, res, next){
	var requestType = req.body.action || null;
	if(requestType == null){
		res.send({success: false, msg: "No action specified"});
		return;
	}

	if(requestType == "create")
		patientMiddleware.addNewPersonInformation(req, res);
	else
		if(requestType == "edit")
			patientMiddleware.edit(req, res);
});

router.post('/updateCall', function(req, res, next){
	callUpdateMiddleware.updateCall(req, res);
});

router.get('/getCallHistory/:id', function(req, res, next){
	callUpdateMiddleware.getCallHistory(req, res);
});

router.get('/fetchAllData', function(req, res, next){
	console.log("inside fetch all data");
	 patientMiddleware.fetchAllData(req, res);
});
module.exports = router;
