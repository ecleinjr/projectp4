// HelloWorld4.js - a simple API running on Node.js and using Express
// added in this version: passing parameters!!
var express = require('express');					// use the express module and call it 'express'
var bodyParser = require('body-parser');			// use the body-parser module and call it 'body-parser'

	//					// initialize counter

var app = express();								// create a new express() server object called 'app'
app.use(bodyParser.urlencoded({extended:false}));   // Set things up so we can parse url encoded stuff
app.use(bodyParser.json());                         // Set things up so we can parse json

var MySQL = require('sync-mysql');					// use the sync-mysql module and call it 'MySQL'


var connection = new MySQL({
  host: "helloworld.cklzhvgx6s17.us-east-1.rds.amazonaws.com", //tuh29416.cdulsapsprrn.us-east-1.rds.amazonaws.com
  user: "admin",
  password: "opensesame", 
  database: "tollschedule"
});


app.use(function(req, res, next) {
    bodyParser.urlencoded({extended:false})
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    next();
  });

// app.get() instructs the application what to do when an HTTP GET request is made to the API.
// In this case, the code only runs if you use the route /sayhello (i.e., http://127.0.0.1/sayhello).
app.get('/getToll', function(req,res){
	// retrieve value of the namePassed parameter sent as part of the GET request
	//res.render('index', {}); // THIS WAS CAUSING YOUR ENGINE ERROR - NOT NEEDED
	var interchangeEnter = req.query.interchangeEnter;
	var interchangeExit = req.query.interchangeExit;
	var Payment = req.query.Payment;
	
	//if (interchangeEnter == '') {
	//	res.send('Please Enter an Interchange Entrance');
	//	console.log("Please Enter Interchange Entrance")	 
	//} 
	
	//else if (Payment == 'EZPass'){
    if (Payment = 'EZPass'){
        const result = connection.query("SELECT toll FROM tollschedule.ezpasstollschedule WHERE interchangeEnter=" + interchangeEnter + " AND interchangeExit=" + interchangeExit);
		console.log('The toll from ' + interchangeEnter + ' to ' + interchangeExit + " paying with " + Payment + " is " + result[0].toll); // CHANGED
		
		res.send('The toll from ' + interchangeEnter + ' to ' + interchangeExit + " paying with " + Payment + " is " + result[0].toll); // CHANGED
			
		//console.log(result[0]);  
	}
	
	else {
		
		const result = connection.query("SELECT toll FROM tollschedule.cashtollschedule WHERE interchangeEnter=" + interchangeEnter + " AND interchangeExit=" + interchangeExit);
		
		
		
			console.log('The toll from ' + interchangeEnter + ' to ' + interchangeExit + " paying with " + Payment + " is " + result[0].toll); // CHANGED
			res.send('The toll from ' + interchangeEnter + ' to ' + interchangeExit + " paying with " + Payment + " is " + result[0].toll); // CHANGED
			
			//console.log(interchangeEnter);
			//console.log(interchangeExit);
			//console.log(result[0]); 
	}
	});

console.log("Listening on port 8080");
app.listen(8080);									// And we're listening on port 8080
