	
	'use strict';
	
	const functions = require('firebase-functions');
	const admin = require('firebase-admin');
	const cors = require('cors')({origin: true});
	admin.initializeApp(functions.config().firebase);
	
	exports.verifytoken = functions.https.onRequest((req, res) => {
		cors(req, res, () => {	
			admin.auth().verifyIdToken(req.get('authtoken')).then(function(decodedToken) {
				// VALID TOKEN
				res.status(200).send({ success: decodedToken.uid });			
			}).catch(function(error) {
				// INVALID TOKEN
				var errormessage = "server error:" + error;
				res.status(500).send({ error: errormessage });
			});		
		});	
	});