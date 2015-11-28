'use strict';
var people = require('../model/people');
var uuid = require('node-uuid');

function getKey(x){
	var matches = [];

	var pattern = /\[(.*?)\]/g;
	var match;
	while ((match = pattern.exec(x)) != null)
	{
	  matches.push(match[1]);
	}
	return matches[0];
}

function getField(x){
	var matches = [];

	var pattern = /\[(.*?)\]/g;
	var match;
	while ((match = pattern.exec(x)) != null)
	{
	  matches.push(match[1]);
	}
	return matches[1];
}

exports.addNewPersonInformation = function(req, res){

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

exports.edit = function(req, res){
	console.log(req.body);
	/*var body = req.body;
	delete body.action;

	var updateData = {};
	for (var key in body) {
		var id = getKey(key);
		var fieldName = getField(key);
		if(fieldName == "personName"){

		}
		console.log(id + " " + fieldName);
		updateData[fieldName] = body[key];
	}*/

	var personName = req.body.personName || null;
	var personPhone = req.body.personPhone || null;
	var immediateFamilyName = req.body.immediateFamilyName || null;
	var immediateFamilyPhone = req.body.immediateFamilyPhone || null;
	var entryDate = req.body.entryDate || null;
	var exitDate = req.body.exitDate || null;
	var bucket = req.body.bucket || null;
	var languagePreference = req.body.languagePreference || null;
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

	var updateData = {
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
	};


	people.findOneAndUpdate({id: id}, updateData, {upsert:true}, function(err, doc){
	    if (err){
	    	console.log(err);
	    	res.send({success: false, msg: "update query failed"});
	    	return;
	    } 
	    res.send("succesfully saved");
	});
	console.log(updateData);

}