
const ICONS = {
  trash: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#b0b0fd" viewBox="0 0 256 256"><path d="M216,50H174V40a22,22,0,0,0-22-22H104A22,22,0,0,0,82,40V50H40a6,6,0,0,0,0,12H50V208a14,14,0,0,0,14,14H192a14,14,0,0,0,14-14V62h10a6,6,0,0,0,0-12ZM94,40a10,10,0,0,1,10-10h48a10,10,0,0,1,10,10V50H94ZM194,208a2,2,0,0,1-2,2H64a2,2,0,0,1-2-2V62H194ZM110,104v64a6,6,0,0,1-12,0V104a6,6,0,0,1,12,0Zm48,0v64a6,6,0,0,1-12,0V104a6,6,0,0,1,12,0Z"></path></svg>',
  check: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#b0b0fd" viewBox="0 0 256 256"><path d="M241.87,69.66l-24-23.56a14,14,0,0,0-19.77,0L104,139,65.9,102.1a14,14,0,0,0-19.8,0l-24,24a14,14,0,0,0,0,19.79l71.62,72a14,14,0,0,0,19.8,0L241.91,89.5A14,14,0,0,0,241.87,69.66ZM233.42,81,105,209.41a2,2,0,0,1-2.81,0l-71.62-72a2,2,0,0,1,0-2.82l24-24A2,2,0,0,1,56,110a2.12,2.12,0,0,1,1.5.64l42.35,41.08a6,6,0,0,0,8.39,0l98.37-97.11a2,2,0,0,1,2.87,0l24,23.56A2,2,0,0,1,233.42,81Z"></path></svg>',
  bookmark: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#b0b0fd" viewBox="0 0 256 256"><path d="M208,26H72A30,30,0,0,0,42,56V224a6,6,0,0,0,6,6H192a6,6,0,0,0,0-12H54v-2a18,18,0,0,1,18-18H208a6,6,0,0,0,6-6V32A6,6,0,0,0,208,26ZM118,38h52v78L147.59,99.2a6,6,0,0,0-7.2,0L118,116Zm84,148H72a29.87,29.87,0,0,0-18,6V56A18,18,0,0,1,72,38h34v90a6,6,0,0,0,9.6,4.8L144,111.5l28.41,21.3A6,6,0,0,0,182,128V38h20Z"></path></svg>',
  add: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#b0b0fd" viewBox="0 0 256 256"><path d="M208,34H48A14,14,0,0,0,34,48V208a14,14,0,0,0,14,14H208a14,14,0,0,0,14-14V48A14,14,0,0,0,208,34Zm2,174a2,2,0,0,1-2,2H48a2,2,0,0,1-2-2V48a2,2,0,0,1,2-2H208a2,2,0,0,1,2,2Zm-36-80a6,6,0,0,1-6,6H134v34a6,6,0,0,1-12,0V134H88a6,6,0,0,1,0-12h34V88a6,6,0,0,1,12,0v34h34A6,6,0,0,1,174,128Z"></path></svg>',
  home: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#b0b0fd" viewBox="0 0 256 256"><path d="M240,210H222V131.17l5.76,5.76a6,6,0,0,0,8.48-8.49L137.9,30.09a14,14,0,0,0-19.8,0L19.76,128.44a6,6,0,0,0,8.48,8.49L34,131.17V210H16a6,6,0,0,0,0,12H240a6,6,0,0,0,0-12ZM46,119.17l80.58-80.59a2,2,0,0,1,2.84,0L210,119.17V210H158V152a6,6,0,0,0-6-6H104a6,6,0,0,0-6,6v58H46ZM146,210H110V158h36Z"></path></svg>',
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

async function getBookCover(title, author) {
  
  const query = encodeURIComponent(`${title} ${author}`);
  const url = `https://openlibrary.org/search.json?q=${query}&fields=cover_i&limit=1`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.docs && data.docs.length > 0 && data.docs[0].cover_i) {
      const coverId = data.docs[0].cover_i;
      
      return `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`;
    }
  } catch (error) {
    console.error("Errore API:", error);
  }
  
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(title)}&size=400&background=1f2937&color=fafafa`;
}


let myLibray = [];

let currentFilter = 'all';

function Book(title, author, pages, read, coverUrl) {
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.coverUrl = coverUrl;
}

function setupSidebar() {

  const homeBtn = document.getElementById('home');
  const readBtn = document.getElementById('show-read');
  const unreadBtn = document.getElementById('show-unread');
  
  homeBtn.prepend(getIcon('home'));
  readBtn.prepend(getIcon('check'));
  unreadBtn.prepend(getIcon('bookmark'));
  document.getElementById('new-book').prepend(getIcon('add'));

  homeBtn.addEventListener('click', () => {
    currentFilter = 'all';
    filterBooks();
  });

  readBtn.addEventListener('click', () => {
    currentFilter = 'read';
    filterBooks();
  });
  
  unreadBtn.addEventListener('click', () => {
    currentFilter = 'unread';
    filterBooks();
  });

  document.getElementById('new-book').addEventListener('click', () => {
  
  });
}

setupSidebar();

async function addBookToLibrary(title, author, pages, read) {
  const coverUrl = await getBookCover(title, author);

  const newBook = new Book(title, author, pages, read, coverUrl);
  myLibray.push(newBook);
  
  filterBooks();
  
  return newBook;
}

function createCard(book) {
  const bookCard = document.createElement('div');
  bookCard.classList.add('card-book');
  bookCard.dataset.id = book.id;

  const bookCover = document.createElement('div');
  bookCover.classList.add('book-cover');
  
  if (book.coverUrl) {
    const img = document.createElement('img');
    img.src = book.coverUrl;
    img.alt = book.title;
    img.style.width = '100%';
    img.style.height = '100%';
    img.style.objectFit = 'cover';
    bookCover.appendChild(img);
  } else {
    bookCover.textContent = 'NO IMAGE';
  }

  const infoOverlay = document.createElement('div');
  infoOverlay.classList.add('info-overlay');

  const bookTitle = document.createElement('h3');
  bookTitle.textContent = book.title;

  const bookAuthor = document.createElement('p');
  bookAuthor.textContent = book.author;

  const bookPages = document.createElement('p');
  bookPages.textContent = `${book.pages} pag.`;

  const toggleBtn = document.createElement('button');
  toggleBtn.classList.add('btn-toggle-read');

  const updateStatusUI = () => {
    toggleBtn.innerHTML = '';
    const iconName = book.read ? 'check' : 'bookmark';
    const icon = getIcon(iconName);

    toggleBtn.appendChild(icon);

    if (book.read) {
      toggleBtn.classList.add('is-read');
    } else {
      toggleBtn.classList.remove('is-read');
    }
  };

  updateStatusUI();

  toggleBtn.addEventListener('click', () => {
    book.toggleRead();
    updateStatusUI();
    filterBooks();
  });

  const removeBook = document.createElement('button');
  removeBook.classList.add('btn-remove');
  const trashIcon = getIcon('trash');
  removeBook.appendChild(trashIcon)
  
  infoOverlay.append(bookTitle, bookAuthor, bookPages, toggleBtn, removeBook);
  bookCard.append(bookCover, infoOverlay);

  removeBook.addEventListener('click', () => {
    const id = bookCard.dataset.id;
    bookCard.classList.add('fade-out');

    setTimeout(() => {
      myLibray = myLibray.filter(b => b.id !== book.id);
      filterBooks();
    }, 300);
  });

  return bookCard;
}

function filterBooks() {
  const bookContainer = document.querySelector('.main-content');
  if (!bookContainer) return;

  bookContainer.innerHTML = '';

  const filteredArray = myLibray.filter(book => {
    if (currentFilter === 'read') return book.read === true;
    if(currentFilter === 'unread') return book.read === false;
    return true;
  });
  

  filteredArray.forEach(book => {
    const newCard = createCard(book);
    bookContainer.appendChild(newCard);
  });
}


Book.prototype.toggleRead = function() {
  this.read = !this.read;
}

async function init() {

  const bookContainer = document.querySelector('.main-content');
  if (bookContainer) bookContainer.innerHTML = '';
  myLibray = [];

  const initialBooks = [
    { t: "Harry Potter and the Philosopher's Stone", a: "J.K. Rowling", p: 300, r: true },
    { t: "1984", a: "George Orwell", p: 328, r: true },
    { t: "Red Rising", a: "Pierce Brown", p: 382, r: true },
    { t: "The Lord of the Rings", a: "Tolkien", p: 1200, r: false }
  ];
  
  await Promise.all(initialBooks.map(b => addBookToLibrary(b.t, b.a, b.p, b.r)));
}

init();