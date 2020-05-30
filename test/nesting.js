const assert = require('assert');
const mongoose = require('mongoose');
const Author = require('../models/author');

// Test Description
describe('Nesting records', function(){

  beforeEach(function(done){
    mongoose.connection.collections.authors.drop(function(){
      done();
    });
  });
  // Create tests
  it('Create an author with sub-documents', function(done){
    let pat = new Author({
      name: 'Patrick Routhfuss',
      books: [{title: 'Name of the wind', pages: 400}]
    });

    pat.save().then(function(){
      Author.findOne({name: 'Patrick Routhfuss'}).then(function(record){
        assert(record.books.length === 1);
        done();
      });
    });
  });

// Create test
  it('Adds a new book to an author', function(done){

      let pat = new Author({
        name: 'Patrick Routhfuss',
        books: [{title: 'Name of the wind', pages: 400}]
      });

    pat.save().then(function(){
      Author.findOne({name: 'Patrick Routhfuss'}).then(function(record){

        // Add a book to the books collection
        record.books.push({title: "Wise Man's Fear", pages: 500});
        record.save().then(function(){
          Author.findOne({name: 'Patrick Routhfuss'}).then(function(result){
            assert(result.books.length === 2);
            done();
          });
        });
      });
    });
  });
});
