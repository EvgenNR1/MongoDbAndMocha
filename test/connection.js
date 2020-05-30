const mongoose = require('mongoose');

// ES6 Promises
mongoose.Promise = global.Promise;

// Connect to the database before tests run
before(function(done){
  // Connect to mongoDB
  mongoose.connect('mongodb://localhost/testaroo', { useNewUrlParser: true, useUnifiedTopology: true });

  mongoose.connection.once('open', function(){
    console.log('Connection established');
    done();
  }).on('error', function(error){
    console.log('Connection error', error);
  });
});

// Drop the characters colletion between each test
beforeEach(function(done){
  // Drop the collection
  mongoose.connection.collections.mariochars.drop(function(){
    done();
  });
});
