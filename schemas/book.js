var mongoose = require('mongoose');
var Category = require('./category');

var bookSchema = {
  title: { type: String, required: true },
  authors: [{ title: { type: String, required: true }, name: { type: String, required: true }}],
  coverImage: { type: String, match: /^http:|https:\/\//i, default: ''},
  genre: { type: String, lowercase: true },
  publishedYear: { type: Number, required: true },
  summary: { type: String, required: true },
  category: Category.categorySchema,
  lending: {
    totalCopies: { type: Number, default: 1 },
    isLent: { type: Boolean, required: true, default: false },
    lentTo: [{ type: String, lowercase: true }]
  }


};

module.exports = new mongoose.Schema(bookSchema);
module.exports.productSchema = bookSchema;

/*
  Key categories for book lending library
  title: string
  author: string
  published year: int
  cover image: url
  summary: string
  isLent: Bool
  lentTo: String

  Most common ways of accessing books will be:
  1. By title
  2. By author

  How should books be associated with authors.
  2 Options
  1. Imbed books within the author object
  2. Link

  How much data are we storing in the author object?
  How much data in each book?

  How will we be searching for data in the future?
  What are the common fields between the different media types?

  Should we cover for multiple copies of books?
*/
