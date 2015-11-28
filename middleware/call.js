'use strict';
var people = require('../model/people');


function updateCall(req, res) {
	console.log(req.body);
	function getParam(key) {
		return req.body[key] || null;
	}
	var phoneNumber = getParam("phoneNumber");
	var response = getParam("response");
	var success = getParam("success");
	var type =	getParam("type");

	if((phoneNumber && response && success) == null) {
		res.send({success: false, msg: "Incomplete call related information"});
	}

	var insertObj = {time: Date.now(), response: response, type: type};
	checkAndInsert(phoneNumber, insertObj, success, function(resBody){
		res.send(resBody);
	});
}

function checkAndInsert(phoneNumber, insertObj, success, callback){
	var findQuery = {};
	if(insertObj.type == "self"){
		findQuery = {"person.phone": phoneNumber};
	}
	else
		if(insertObj.type == "relative"){
			console.log("relative");
			findQuery = {"immediateFamily.phone": phoneNumber};
		}
	people.findOne(findQuery, function(err, data) {
		if(err || data == null) {
			if(err){
				console.log(err);
				callback({success: false, msg: "Unknown error"});
			}
			else{
				console.log("No row found");
				callback({success: false, msg: "No row found error"});
			}
			
		} else {
			console.log(data);
			data.calls.push(insertObj);
			if(success == true) {
				data.failedContactCount = 0;
			}
			data.save(function(err) {
				if(err) {
					console.log(err);
					callback({success: false, msg: "No row update error"});
				} else {
					callback({success: true});
				}
			});
		}
	});
}

module.exports = {
	updateCall: updateCall,
	checkAndInsert: checkAndInsert
}
