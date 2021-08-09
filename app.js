localStorage.setItem("books", []);

function Book(title, author) {
    this.title = title
    this.author = author
}

function addNewBook() {
    title = document.getElementById("bookTitle").value;
    author = document.getElementById("bookAuthor").value;

    newBook = new Book(title, author)

    let books = localStorage.getItem("books").push(newBook)
    localStorage.setItem("books", books);

    console.log("Here are your book list", books)
}

