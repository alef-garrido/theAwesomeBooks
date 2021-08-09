/* eslint-disable no-unused-vars */
/* eslint-disable array-callback-return */

let books = [];

function Book(title, author) {
  this.title = title;
  this.author = author;
}

function saveToStorage(arr) {
  localStorage.setItem('bookList', JSON.stringify(arr));
}

function getFromStorage() {
  if (localStorage.getItem('bookList') === null) {
    books = [];
  } else {
    books = JSON.parse(localStorage.getItem('bookList'));
  }
  return books;
}

function bookList() {
  const bookListContainer = document.getElementById('books');
  bookListContainer.innerHTML = '';
  books = getFromStorage();
  books.map((book, index) => {
    const bookContainer = document.createElement('li');
    const titlePTag = document.createElement('p');
    titlePTag.appendChild(document.createTextNode(book.title));
    bookContainer.id = index;
    const authorPTag = document.createElement('p');
    authorPTag.appendChild(document.createTextNode(book.author));

    const removeButtonTag = document.createElement('button');
    removeButtonTag.appendChild(document.createTextNode('Remove'));
    removeButtonTag.classList.add('delete-btn');

    bookContainer.append(titlePTag, authorPTag, removeButtonTag);
    bookListContainer.appendChild(bookContainer);
  });
}

function addNewBook() {
  const title = document.getElementById('bookTitle').value;
  const author = document.getElementById('bookAuthor').value;

  const newBook = new Book(title, author);

  books.push(newBook);
  saveToStorage(books);
  bookList();
}

function removeBook(id) {
  books.splice(id, 1);
  saveToStorage(books);
}

const displayContainer = document.querySelector('#books');
displayContainer.addEventListener('click', (e) => {
  if (e.target.classList.contains('delete-btn')) {
    removeBook(e.target.parentNode.id);
  }
  bookList();
});
