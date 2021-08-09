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
    bookList()
}

function bookList() {
    bookListContainer = document.getElementById("books")
    books = getFromStorage();
    books.map((book, index) => {
        const bookContainer = document.createElement("li")
        const title_p_tag =  document.createElement("p")
        title_p_tag.appendChild(document.createTextNode(book.title));
        bookContainer.id = index
        const author_p_tag =  document.createElement("p")
        author_p_tag.appendChild(document.createTextNode(book.author));

        const remove_button_tag =  document.createElement("button")
        remove_button_tag.appendChild(document.createTextNode("Remove"));
        remove_button_tag.classList.add('delete-btn')

        bookContainer.append(title_p_tag, author_p_tag, remove_button_tag);
        bookListContainer.appendChild(bookContainer);
    })
}

function removeBook(id) {
  console.log(books)
  books.splice(id, 1)
  console.log(books)
  saveToStorage(books)
}

const displayContainer = document.querySelector('#books')
displayContainer.addEventListener('click', (e) => {
  if (e.target.classList.contains('delete-btn')) {
    removeBook(e.target.parentNode.id)
  }
  bookList()
})