/* eslint-disable no-unused-vars */
/* eslint-disable array-callback-return */

let books = [];

class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
}

// Class to Handle Storage 

class CollectionStorage {

  static saveToStorage(arr) {
    localStorage.setItem("BookCollecti", JSON.stringify(arr));
  }

  static getFromStorage() {
    if (localStorage.getItem("BookCollecti") === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem("BookCollecti"));
    }
    return books;
  }
}

// Class of Book List
class BookCollection {
  constructor (book) {
    
  }

  static addNewBook() {
    const title = document.getElementById("bookTitle").value;
    const author = document.getElementById("bookAuthor").value;
  
    const newBook = new Book(title, author);
  
    books.push(newBook);
    CollectionStorage.saveToStorage(books);
    BookCollecti();
  }

  static removeBook(id) {
    books.splice(id, 1);
  }
}

function bookList() {
  const BookCollectiContainer = document.getElementById("books");
  BookCollectiContainer.innerHTML = "";
  books = CollectionStorage.getFromStorage();
  books.map((book, index) => {
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


const displayContainer = document.querySelector("#books");
displayContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-btn")) {
    BookCollecti.removeBook(e.target.parentNode.id);
  }
  BookCollecti();
});
