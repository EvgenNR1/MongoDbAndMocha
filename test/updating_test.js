const assert = require('assert');
const MarioChar = require('../models/mariochar');
//Describe tests
describe('Updating records', function(){
  let char;
  beforeEach(function(done){
    char = new MarioChar({
      name: 'Mario',
      weight: 50
    });

    char.save().then(() => {
      done();
    });
  });
  //create tests
  it('Updates one record in the database', function(done){
    MarioChar.findOneAndUpdate({name: 'Mario'}, {name: 'Luigi'}).then(function(){
      MarioChar.findOne({_id: char._id}).then(function(result){
        assert(result.name === 'Luigi');
        done();
      });
    });
  });

  it('Increments the weight by 1', function(done){
    MarioChar.update({}, {$inc: { weight: 1 } }).then(function(){
      MarioChar.findOne({name: 'Mario'}).then(function(record){
        assert(record.weight === 51);
        done();
      });
    });
  });




});
