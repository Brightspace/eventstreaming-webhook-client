const express = require('express');
const app = express();
const sha256 = require('crypto-js/sha256');
const Base64 = require('crypto-js/enc-base64');

const secret = 'cifVxv4OVCt4WkXOeFEeGGPyFdoUG1t2';
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.all('', function(req,res) {
	console.log(req.headers);
	console.log(req.body);
	const computedHeader = computeHeader(
		secret,
		JSON.stringify(req.body)
	);
	const requestHeader = req.headers['x-brightspace-hmac-sha256'];
	if ( requestHeader !== computedHeader ) {
		console.log(`Expected ${computedHeader} but received ${requestHeader}`);
		res.status(400);
		res.send(`Bad request: Expected ${computedHeader} but received ${requestHeader}`);
	} else {
		res.status(200);
		res.send('OK');
		const brightspaceEvents = req.body.Records;
		console.log(`Successfully received ${brightspaceEvents.length} events.`);
		process(brightspaceEvents);
	}
});

const process = (events) => {
	for (const event of events) {
		console.log(JSON.stringify(event));
	}
};

const computeHeader = (key, message) => {
	const digest = sha256(key + sha256(key + message));
	return Base64.stringify(digest);
};

module.exports = app;
