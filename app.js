/* eslint-disable no-unused-vars */
/* eslint-disable array-callback-return */

// let books = [];

class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
}

// Class to Handle Storage 

class CollectionStorage {

  static saveToStorage(arr) {
    localStorage.setItem("BookCollection", JSON.stringify(arr));
  }

  static getFromStorage() {
    let books
    if (localStorage.getItem("BookCollection") === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem("BookCollection"));
    }
    return books;
  }
}

// Class of Book List
class BookCollection {

  books = []
 
  static addNewBook() {
    const title = document.getElementById("bookTitle").value;
    const author = document.getElementById("bookAuthor").value;
  
    const newBook = new Book(title, author);
  
    this.books.push(newBook);
    CollectionStorage.saveToStorage(books);
    this.bookList();
  }

  static removeBook(id) {
    this.books.splice(id, 1);
  }

  static bookList() {
    const BookCollectionContainer = document.getElementById("books");
    BookCollectionContainer.innerHTML = "";

    this.books = CollectionStorage.getFromStorage();

    this.books.map((book, index) => {
      const bookContainer = document.createElement("li");
      const titlePTag = document.createElement("p");
      titlePTag.appendChild(document.createTextNode(book.title));
      bookContainer.id = index;
      const authorPTag = document.createElement("p");
      authorPTag.appendChild(document.createTextNode(book.author));
  
      const removeButtonTag = document.createElement("button");
      removeButtonTag.appendChild(document.createTextNode("Remove"));
      removeButtonTag.classList.add("delete-btn");
  
      bookContainer.append(titlePTag, authorPTag, removeButtonTag);
      BookCollectiContainer.appendChild(bookContainer);
    });
  }
}


const displayContainer = document.querySelector("#books");
displayContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-btn")) {
    BookCollection.removeBook(e.target.parentNode.id);
  }
  BookCollection.bookList();
});
