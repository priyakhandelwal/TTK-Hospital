var express = require('express');
var router = express.Router();
var peopleModel = require('../model/people');
var patientMiddleware = require('../middleware/people');
var callUpdateMiddleware = require('../middleware/call');

var plivo = require('plivo');
var ivrConfig = require('../ivr/ivrConfig.js');

/* GET home page. */
router.get('/', function(req, res, next) {
    //res.render('index', { title: 'Express' });

    res.sendFile(__dirname + "../public/index.html");
});



router.post('/people', function(req, res, next) {
    var requestType = req.body.action || null;
    if (requestType == null) {
        res.send({
            success: false,
            msg: "No action specified"
        });
        return;
    }

    if (requestType == "create")
        patientMiddleware.addNewPersonInformation(req, res);
    else
    if (requestType == "edit")
        patientMiddleware.edit(req, res);
});

router.post('/callXml/:level', function(req, res, next) {
    var response = plivo.Response();
    response.addSpeak(ivrConfig[parseInt(req.params.level)].message);
    var getDigits = response.addGetDigits({
        action: '/logCallResponse',
        method: 'GET',
        numDigits: 1,
        timeout: 10,
        retries: 2
    });
    getDigits.addSpeak('Enter 1,2,3,4,5 Please !!!');
    res.set('Content-Type', 'text/plain');
    res.end(response.toXML());
});

router.get('/logCallResponse/', function(req, res, next) {
    var response = plivo.Response();
    console.log("%j", req.query);
    response.addSpeak('Your response has been noted. Thanks for your feedback.');
    res.set('Content-Type', 'text/plain');
    res.end(response.toXML());
});

router.post('/call', function(req, res, next) {
    callUpdateMiddleware.updateCall(req, res);
});

router.get('/fetchAllData', function(req, res, next) {
    console.log("inside fetch all data");
    patientMiddleware.fetchAllData(req, res);
});

router.get('/deleteRecord', function(req, res, next){
	patientMiddleware.deleteRecord(req, res);
});

module.exports = router;
