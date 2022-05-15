const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://Evan_Wu:Hunter12!%40%23@cluster0.qjxev.mongodb.net/carTradeDatabase?retryWrites=true&w=majority', { useNewURLParser: true, useUnifiedTopology: true});


const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(){
    console.log('Connected')
});

//Models
require('../routes/User');