# 349_Final_Project

Programmers: Mark Wiedeman and Evan Wu

To connect to mongodb get your connection string and paste it in ../server/models/database.js mongoose.connect("CONNECTION STRING HERE", { useNewURLParser: true, useUnifiedTopology: true}); between the quotations.

Directories used
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const path = require('path')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const passport = require('passport');
