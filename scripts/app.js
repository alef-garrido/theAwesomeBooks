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
    localStorage.setItem("BookCollection", JSON.stringify(arr));
  }

  static getFromStorage() {
    let books;
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
  books = [];

  static addNewBook() {
    const title = document.getElementById("bookTitle").value;
    const author = document.getElementById("bookAuthor").value;

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
    const BookCollectionContainer = document.getElementById("books");
    BookCollectionContainer.innerHTML = "";

    this.books = CollectionStorage.getFromStorage();

    if (this.books.length === 0) {
      const emptyState = document.createElement("p");
      emptyState.innerHTML =
        "Your bookshelf is empty :( <br /> Add some titles!";
      emptyState.classList.add("text-center", "p-3");
      emptyState.classList.add("empty");
      BookCollectionContainer.append(emptyState);
    } else {
      this.books.map((book, index) => {
        const bookContainer = document.createElement("li");
        const titlePTag = document.createElement("p");
        titlePTag.appendChild(
          document.createTextNode(`"${book.title}" by ${book.author}`)
        );
        titlePTag.classList.add("ms-5");
        bookContainer.id = index;
        bookContainer.classList.add("d-flex", "justify-content-between");

        const removeButtonTag = document.createElement("button");
        removeButtonTag.appendChild(document.createTextNode("Remove"));
        removeButtonTag.classList.add(
          "delete-btn",
          "me-5",
          "btn",
          "btn-secondary"
        );

        bookContainer.append(titlePTag, removeButtonTag);
        BookCollectionContainer.appendChild(bookContainer);
      });
    }
  }
}

const displayContainer = document.querySelector("#books");
displayContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-btn")) {
    BookCollection.removeBook(e.target.parentNode.id);
  }
  BookCollection.bookList();
});

// navbar manipulation
const listOption = document.getElementById("list-option");
const addNewOption = document.getElementById("add-new-option");
const contactOption = document.getElementById("contact-option");
const listSection = document.getElementById("list-sec");
const addNewBookSection = document.getElementById("add-new-book-sec");
const contactSection = document.getElementById("contact-sec");

listOption.addEventListener("click", function (e) {
  e.target.classList.toggle = "active";
  listSection.style.display = "block";
  addNewBookSection.style.display = "none";
  contactSection.style.display = "none";
});

addNewOption.addEventListener("click", function (e) {
  e.target.classList.toggle = "active";
  listSection.style.display = "none";
  addNewBookSection.style.display = "block";
  contactSection.style.display = "none";
});

contactOption.addEventListener("click", function (e) {
  e.target.classList.toggle = "active";
  listSection.style.display = "none";
  addNewBookSection.style.display = "none";
  contactSection.style.display = "block";
});


// Date Display

var DateTime = luxon.DateTime;
let time = DateTime.now().toLocaleString(DateTime.DATETIME_MED)
console.log(time)

const timeContainer = document.querySelector('#dateTime')
const date = document.createElement('p')
date.innerHTML = time
date.classList.add('float-right', 'me-5', 'my-3')
timeContainer.appendChild(date)