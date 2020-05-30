const assert = require('assert');
const MarioChar = require('../models/mariochar');
//Describe tests
describe('Saving records', function(){
  //create tests
  it('Saves a record to the database', function(done){
    let char = new MarioChar({
      name: 'Mario'
    });

    char.save().then(() => {
      assert(char.isNew === false);
      done();
    });
  });
});
