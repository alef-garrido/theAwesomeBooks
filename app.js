let books = []

function Book(title, author) {
    this.title = title
    this.author = author
}

function saveToStorage(arr) {
  localStorage.setItem('bookList', JSON.stringify(arr))
}

function getFromStorage() { 
  if (localStorage.getItem('bookList') === null) {
    books = []
  } else {
    books = JSON.parse(localStorage.getItem('bookList'))
  }
  return books
}

function addNewBook() {
    const title = document.getElementById("bookTitle").value;
    const author = document.getElementById("bookAuthor").value;

    let newBook = new Book(title, author)

    books.push(newBook)
    saveToStorage(books)
    console.log("Here are your book list", getFromStorage())
}


