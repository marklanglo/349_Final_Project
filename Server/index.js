
const express = require('express')
const cors = require('cors')
const app = express()
const mongo = require('mongodb')
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";

app.set('port', 3000)

app.use(express.json())
app.use(cors()) 

app.get('/api/students/:id', function(req, res){
	console.log(`${req.params.id}`)
	MongoClient.connect(url, function(err, conn) {
	  if (err) throw err;
	  var dbo = conn.db("campus-01");
	  const criteria = {_id : new mongo.ObjectID(req.params.id)}
	  dbo.collection('students').find(criteria).toArray(function(err, result) {
		  if (err) console.log(err)
		  else {
			  res.type('application/json')
			  res.status(200)
			  res.json(result)
		  }	  
	  })
	})
})

// Process the Search Student service request 
app.get('/api/students', function(req, res){
	if (Object.keys(req.query).length == 0) {
		// Get All 
		MongoClient.connect(url, function(err, db) {
		  if (err) throw err;
		  const dbo = db.db("campus-01");
		  dbo.collection("students").find({}).toArray(function(err, result) {
			if (err) throw err;
			db.close()
			res.type('application/json')
			res.status(200)
			res.send(result)
		  });
		});		
	}
})

app.post('/api/students', function(req, res) {
	console.log(req.body)
	MongoClient.connect(url, function(err, conn) {
	  if (err) throw err;
	  var dbo = conn.db("campus-01");
	  // Construct the object to be inserted into DB
	  // myObj = new Student()
	  const myObj = new Object()
	  myObj.firstName = req.body.firstName
	  myObj.lastName = req.body.lastName
	  const dt_fields = req.body.dob.split('-')
	  myObj.dob = new Date(dt_fields[0], dt_fields[1]-1, dt_fields[2])
	  // 
	  dbo.collection("students").insertOne(myObj, function(err, result) {
		  if (err) console.log(err)
		  else {
			  //
			  res.type('application/json')
			  res.status(200)
			  res.json(result)
		  }
	  })		
	})
})

// Exercise #5 
app.put('/api/students/:id', function(req, res){
	const id = req.params.id
	const criteria = {_id : new mongo.ObjectID(req.params.id)}
	const newValues = req.body
	MongoClient.connect(url, function(err, conn) {
	  if (err) throw err;
	  const dbo = conn.db("campus-01");
	  dbo.collection('students').updateOne(criteria, {$set: newValues}, function(err, result){
		  if (err) console.log(err)
		  else {
			  //
			  res.type('application/json')
			  res.status(200)
			  res.json(result)
		  }
	  })
	})
})

app.listen(app.get('port'), function(){
	console.log('Express server started on http://localhost:' + app.get('port'));
	console.log(__dirname)
})
