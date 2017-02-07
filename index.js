var mongoose = require('mongoose');
var bookSchema = require('./schemas/book.js');
var Book = mongoose.model('Book', bookSchema);
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var morgan = require('morgan');

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
  var book = req.body;

  var newBook = new Book({
    title: book.title,
    authors: [{ title: "Author", name: book.author }],
    coverImage: book.coverURL,
    genre: book.genre,
    publishedYear: book.yearPublished,
    summary: book.summary,
    lending: {
      totalCopies: book.totalCopies,
      isLent: false,
      lentTo: []
    }
  });

  newBook.save(function(err) {
    if(err) {
      console.log(err);
      console.error.bind(console, 'error saving document: ');

      return res.status(500).json({
                success: false,
                message: 'Dang son, couldn\'t make your book'
              });
    } else {
      return res.status(200).json({
                success: true,
                message: "Absolutely successful"
              });
    }


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
