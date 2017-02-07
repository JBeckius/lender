var bookSubmit = document.getElementById('bookSubmit');

bookSubmit.addEventListener('click', function(event) {
  event.preventDefault();
  var title = document.getElementById('bookTitle').value,
      coverURL = document.getElementById('bookCoverURL').value,
      author = document.getElementById('bookAuthor').value,
      genre = document.getElementById('bookGenre').value,
      yearPublished = document.getElementById('bookYearPublished').value,
      summary = document.getElementById('bookSummary').value,
      totalCopies = document.getElementById('bookTotalCopies').value

  var book = {
    title: title,
    coverURL: coverURL,
    author: author,
    genre: genre,
    yearPublished: yearPublished,
    summary: summary,
    totalCopies: totalCopies
  }

  Connect.submitBook(book);

})
