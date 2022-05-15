const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const path = require('path')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const JWT_SECRET = 'sdjkfh8923yhjdksbfma@#*(&@*!^#&@bhjb2qiuhesdbhjdsfg839ujkdhfjk'

const app = express();
const port = process.env.PORT || 3000;


app.use(express.urlencoded( { extrended:true } ));
app.use(express.static('public'));
app.use(expressLayouts);

app.set('layout', './layouts/main');
app.set('view engine', 'ejs');

const routes = require('./server/routes/carRoutes.js')
app.use('/', routes);

app.listen(port, ()=> console.log('Listening to port 3000'));

