
let myLibray = [];

function Book(title, author, pages, read) {
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary(title, author, pages, read) {
  const newBook = new Book(title, author, pages, read);
  myLibray.push(newBook);
  
  const bookContainer = document.querySelector('.main-content');
  const newCard = createCard(newBook);
  bookContainer.appendChild(newCard);
}

function createCard(book) {
  const bookCard = document.createElement('div');
  bookCard.classList.add('card-book');
  bookCard.dataset.id = book.id;

  const bookTitle = document.createElement('h3');
  bookTitle.textContent = book.title;
  bookCard.appendChild(bookTitle);

  const bookAuthor = document.createElement('p');
  bookAuthor.textContent = book.author;
  bookCard.appendChild(bookAuthor);

  const bookPages = document.createElement('p');
  bookPages.textContent = book.pages;
  bookCard.appendChild(bookPages);

  const bookRead = document.createElement('p');
  bookRead.textContent = book.read;
  bookCard.appendChild(bookRead);

  const toggleBtn = document.createElement('button');
  toggleBtn.textContent = 'Stato';
  bookCard.appendChild(toggleBtn);

  const removeBook = document.createElement('button');
  removeBook.textContent = 'remove';
  bookCard.appendChild(removeBook);

  removeBook.addEventListener('click', () => {
    const id = bookCard.dataset.id;
    bookCard.classList.add('fade-out');

    setTimeout(() => {
      myLibray = myLibray.filter(b => b.id !== book.id);
      bookCard.remove();
    }, 300);
  });

  toggleBtn.addEventListener('clicl', () => {
    book.toggleRead();
    bookRead.textContent = book.read ? "Read" : "Not Read"
  });

  return bookCard;
}

function displayBooks() {
  const bookContainer = document.querySelector('.main-content');
  if (!bookContainer) return;
  bookContainer.innerHTML = '';

  myLibray.forEach(book => {
    const newCard = createCard(book);
    bookContainer.appendChild(newCard);
  });
}

Book.prototype.toggleRead = function() {
  this.read = !this.read;
}

myLibray.push(new Book("Harry Potter", "Rowling", 300, true));
myLibray.push(new Book("1984", "Orwell", 328, false));

displayBooks();