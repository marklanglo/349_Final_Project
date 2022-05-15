const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://markwiedeman5:markWie81638!@cluster0.zoym3.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', { useNewURLParser: true, useUnifiedTopology: true});


const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(){
    console.log('Connected')
});

//Models
require('../routes/User');
