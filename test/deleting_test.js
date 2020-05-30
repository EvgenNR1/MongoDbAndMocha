const assert = require('assert');
const MarioChar = require('../models/mariochar');
//Describe tests
describe('Deleting records', function(){
  let char;
  beforeEach(function(done){
    char = new MarioChar({
      name: 'Mario'
    });

    char.save().then(() => {
      assert(char.isNew === false);
      done();
    });
  });
  //create tests
  it('Deletes one record from the database', function(done){
    MarioChar.findOneAndRemove({name:'Mario'}).then(function(){
      MarioChar.findOne({name:'Mario'}).then(function(result){
        assert(result === null);
        done();
      });
    });
  });
});
