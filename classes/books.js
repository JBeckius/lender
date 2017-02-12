var mongoose = require('mongoose');
var bookSchema = require('../schemas/bookSchema.js');
var Book = mongoose.model('Book', bookSchema);

mongoose.Promise = require('bluebird');


var Books = (function() {
  var insertOne = function insertOne(bookInfo, db) {

    var newBook = new Book({
      title: bookInfo.title,
      authors: [{ title: "Author", name: bookInfo.author }],
      coverImage: bookInfo.coverURL,
      genre: bookInfo.genre,
      publishedYear: bookInfo.yearPublished,
      summary: bookInfo.summary,
      lending: {
        totalCopies: bookInfo.totalCopies,
        isLent: false,
        lentTo: []
      }
    });

    return newBook.save();
  };

  return {
    insertOne: insertOne
  }
})();

module.exports = Books;
