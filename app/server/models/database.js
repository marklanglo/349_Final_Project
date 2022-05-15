const mongoose = require('mongoose');
mongoose.connect('CONNECTION STRING HERE', { useNewURLParser: true, useUnifiedTopology: true});


const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(){
    console.log('Connected')
});

//Models
require('../routes/User');