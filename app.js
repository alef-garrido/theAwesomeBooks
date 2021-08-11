/* eslint-disable max-classes-per-file */
/* eslint-disable array-callback-return */

class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
}

// Class to Handle Storage

class CollectionStorage {
  static saveToStorage(arr) {
    localStorage.setItem('BookCollection', JSON.stringify(arr));
  }

  static getFromStorage() {
    let books;
    if (localStorage.getItem('BookCollection') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('BookCollection'));
    }
    return books;
  }
}

// Class of Book List
class BookCollection {
  books = []

  static addNewBook() {
    const title = document.getElementById('bookTitle').value;
    const author = document.getElementById('bookAuthor').value;

    const newBook = new Book(title, author);

    this.books.push(newBook);
    CollectionStorage.saveToStorage(this.books);
    this.bookList();
  }

  static removeBook(id) {
    this.books.splice(id, 1);
    CollectionStorage.saveToStorage(this.books);
  }

  static bookList() {
    const BookCollectionContainer = document.getElementById('books');
    BookCollectionContainer.innerHTML = '';

    this.books = CollectionStorage.getFromStorage();

    this.books.map((book, index) => {
      const bookContainer = document.createElement('li');
      const titlePTag = document.createElement('p');
      titlePTag.appendChild(document.createTextNode(`"${book.title}" by ${book.author}`));
      titlePTag.classList.add('ms-5')
      bookContainer.id = index;
      bookContainer.classList.add('d-flex', 'justify-content-between')

      const removeButtonTag = document.createElement('button');
      removeButtonTag.appendChild(document.createTextNode('Remove'));
      removeButtonTag.classList.add('delete-btn', 'me-5', 'btn', 'btn-secondary');

      bookContainer.append(titlePTag, removeButtonTag);
      BookCollectionContainer.appendChild(bookContainer);
    });
  }
}

const displayContainer = document.querySelector('#books');
displayContainer.addEventListener('click', (e) => {
  if (e.target.classList.contains('delete-btn')) {
    BookCollection.removeBook(e.target.parentNode.id);
  }
  BookCollection.bookList();
});
