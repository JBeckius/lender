var mongoose = require('mongoose');
var bookSchema = require('./schemas/bookSchema.js');
var Book = mongoose.model('Book', bookSchema);
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var morgan = require('morgan');
var Books = require('./classes/books.js');

mongoose.Promise = require('bluebird');
//assert.equal(query.exec().constructor, require('bluebird'));
// Config Biz
var port = process.env.PORT || 8088;

// Connect to DB
mongoose.connect('mongodb://localhost/libraryApp');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', function() {
  console.log('DB connection open');
});

// Invoke middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev'));

app.get('/', function( req, res, next ) {
  res.sendFile(__dirname + '/app/index.html');
})
.get('/scripts.js', function( req, res ) {
  res.sendFile(__dirname + '/app/dist/js/scripts.js');
});

app.post('/books', function( req, res, next ) {
  console.log(req.body);
  //res.json({ message: "API is get" });
  var bookInfo = req.body;

  Book.findOne({title: bookInfo.title}).then(function(book) {
    console.log("I got a thing out of the thing", book);
  });

  Books.insertOne(bookInfo, db)
  .then(function(message) {
    console.log("message bloop: ", message);

      return res.status(200).json({
        success: true,
        message: message.message
      });
  })
  .catch(function(err) {
    console.log("message scoop: ", err);
    return res.status(500).json({
      success: false,
      message: err.message
    })
  });
});




// db.once('open', function() {
//   var theKnight = new Book({
//     title: "The Knight",
//     authors: [{ title: "Author", name: "Gene Wolfe" }],
//     coverImage: "http://images.macmillan.com/folio-assets/macmillan_us_frontbookcovers_1000H/9780765313485.jpg",
//     genre: "fantasy",
//     publishedYear: 2004,
//     summary: "A young boy is lured by fairies into another world. There, he meets the queen of the elves, who transforms him into a man. For love and honor, he embarks on a quest to become the greatest knight ever to live in this other world.",
//     lending: {
//       totalCopies: 1,
//       isLent: false,
//       lentTo: []
//     }
//   });
//   // theKnight.save(function(err) {
//   //   return console.error.bind(console, 'error saving document: ');
//   // });
// });

app.listen(port);
console.log('Express test server on port ' + port);
