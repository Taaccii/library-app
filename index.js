
const ICONS = {
  trash: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#b0b0fd" viewBox="0 0 256 256"><path d="M216,50H174V40a22,22,0,0,0-22-22H104A22,22,0,0,0,82,40V50H40a6,6,0,0,0,0,12H50V208a14,14,0,0,0,14,14H192a14,14,0,0,0,14-14V62h10a6,6,0,0,0,0-12ZM94,40a10,10,0,0,1,10-10h48a10,10,0,0,1,10,10V50H94ZM194,208a2,2,0,0,1-2,2H64a2,2,0,0,1-2-2V62H194ZM110,104v64a6,6,0,0,1-12,0V104a6,6,0,0,1,12,0Zm48,0v64a6,6,0,0,1-12,0V104a6,6,0,0,1,12,0Z"></path></svg>',
  check: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#b0b0fd" viewBox="0 0 256 256"><path d="M241.87,69.66l-24-23.56a14,14,0,0,0-19.77,0L104,139,65.9,102.1a14,14,0,0,0-19.8,0l-24,24a14,14,0,0,0,0,19.79l71.62,72a14,14,0,0,0,19.8,0L241.91,89.5A14,14,0,0,0,241.87,69.66ZM233.42,81,105,209.41a2,2,0,0,1-2.81,0l-71.62-72a2,2,0,0,1,0-2.82l24-24A2,2,0,0,1,56,110a2.12,2.12,0,0,1,1.5.64l42.35,41.08a6,6,0,0,0,8.39,0l98.37-97.11a2,2,0,0,1,2.87,0l24,23.56A2,2,0,0,1,233.42,81Z"></path></svg>',
  bookmark: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#b0b0fd" viewBox="0 0 256 256"><path d="M208,26H72A30,30,0,0,0,42,56V224a6,6,0,0,0,6,6H192a6,6,0,0,0,0-12H54v-2a18,18,0,0,1,18-18H208a6,6,0,0,0,6-6V32A6,6,0,0,0,208,26ZM118,38h52v78L147.59,99.2a6,6,0,0,0-7.2,0L118,116Zm84,148H72a29.87,29.87,0,0,0-18,6V56A18,18,0,0,1,72,38h34v90a6,6,0,0,0,9.6,4.8L144,111.5l28.41,21.3A6,6,0,0,0,182,128V38h20Z"></path></svg>',
}

function getIcon(name) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(ICONS[name], "image/svg+xml");
  const svg = doc.querySelector("svg");
  svg.setAttribute("fill", "currentColor");
  svg.setAttribute("width", "24");
  svg.setAttribute("height", "24");
  svg.style.display = "block";
  return svg;
}


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

  const bookCover = document.createElement('div');
  bookCover.classList.add('book-cover');
  bookCover.textContent = 'COPERTINA';

  const infoOverlay = document.createElement('div');
  infoOverlay.classList.add('info-overlay');

  const bookTitle = document.createElement('h3');
  bookTitle.textContent = book.title;

  const bookAuthor = document.createElement('p');
  bookAuthor.textContent = book.author;

  const bookPages = document.createElement('p');
  bookPages.textContent = `${book.pages} pag.`;

  const bookRead = document.createElement('p');
  bookRead.textContent = book.read ? "Letto" : "Da leggere";

  const toggleBtn = document.createElement('button');
  toggleBtn.textContent = 'Stato';
  toggleBtn.classList.add('btn-toggle-read');

  const removeBook = document.createElement('button');
  removeBook.classList.add('btn-remove');
  const trashIcon = getIcon('trash');
  removeBook.appendChild(trashIcon)
  
  infoOverlay.append(bookTitle, bookAuthor, bookPages, bookRead, toggleBtn, removeBook);
  bookCard.append(bookCover, infoOverlay);

  removeBook.addEventListener('click', () => {
    const id = bookCard.dataset.id;
    bookCard.classList.add('fade-out');

    setTimeout(() => {
      myLibray = myLibray.filter(b => b.id !== book.id);
      bookCard.remove();
    }, 300);
  });

  toggleBtn.addEventListener('click', () => {
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