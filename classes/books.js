var mongoose = require('mongoose');
var bookSchema = require('../schemas/bookSchema.js');
var Book = mongoose.model('Book', bookSchema);

mongoose.Promise = require('bluebird');


var Books = (function() {
  var insertOne = function insertOne(bookInfo, db) {

    console.log("bookInfo: ", bookInfo);

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
    /* I have three levels of async code that I need to execute
       First, I make a query to the db to check for duplicate records
       Second, if the first query find no matches, save the new document
    */
    return checkForDuplicates(bookInfo).then(function(book) {
      console.log("Book: ", book);
      if (book)
      {
        console.log("Book be there======")
        throw new Error("Book already created", book);
      }
      else
      {
        console.log("No book be there");
        return newBook.save();
      }
    });

  };

  var checkForDuplicates = function checkForDuplicates(bookInfo) {
    console.log("BookInfo: ", bookInfo);
     return Book.findOne({title: bookInfo.title, "authors.name": bookInfo.author});
  };


  return {
    insertOne: insertOne
  }
})();

module.exports = Books;
