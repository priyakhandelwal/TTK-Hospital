'use strict';
var people = require('../model/people');
var uuid = require('node-uuid');


exports.addNewPatientInformation = function(req, res){

	console.log(req.body);
	var personName = req.body.personName || null;
	var personPhone = req.body.personPhone || null;
	var immediateFamilyName = req.body.immediateFamilyName || null;
	var immediateFamilyPhone = req.body.immediateFamilyPhone || null;
	var entryDate = req.body.entryDate || null;
	var exitDate = req.body.exitDate || null;
	var bucket = req.body.bucket || null;
	var languagePreference = req.body.languagePreference || null;
	var failedContactCount = 0;
	var id = uuid.v1();

	if(personName == null || personPhone == null){
		console.log("Incomplete patient information\n");
		res.send({success: false, msg: "Incomplete patient information"});
		return;
	}

	if(immediateFamilyName == null || immediateFamilyPhone == null){
		console.log("Incomplete support person information\n");
		res.send({success: false, msg: "Incomplete support person information"});
		return;
	}

	var patientInfo = new people({
		id : id,
		person : {
			name : personName,
			phone : personPhone
		},
		immediateFamily : {
			name : immediateFamilyName,
			phone: immediateFamilyPhone
		},
		entryDate : entryDate,
		exitData : exitDate,
		bucket : bucket,
		languagePreference : languagePreference,
		failedContactCount : failedContactCount
	});

	console.log(patientInfo);

	patientInfo.save(function(err, savedObject){
		if(err){
			console.log("Error creating a new patient record");
			res.send({success : false, msg: "DB error"});
		}
		else{
			console.log("Patient record created" + savedObject);
			res.send({success : true});
		}
	});
};