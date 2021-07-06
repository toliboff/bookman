const books= document.getElementById('books');
const form= document.getElementById('add-form');
const title= document.getElementById('title');
const author= document.getElementById('author');
const addBtn= document.getElementById('addBtn');

let formData={
  title:'',
  author: '',
}

window.addEventListener('load', () => {
  if (localStorage.getItem('bookdata')){
    const books =  JSON.parse(localStorage.getItem('bookdata'));
    showBooks(books);
  } 
})


const formInputs = form.querySelectorAll('input[type="text"]');
formInputs.forEach((input) => {
  input.addEventListener('input', (event) => {
   formData={...formData, [event.target.id] : event.target.value, id:Date.now()}
  })
})

form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  addBook();
})

// --------------- SHOW BOOKS ---------------------------
function showBooks(arr) {
  const htmlCode = arr.map((book) => `
    <li>
      <h2>${book.title}</h2>
      <span class="author">${book.author}</h2>
      <button type="button" data-id="${book.id}">Remove</button>
    </li>
  `).join('');
  books.innerHTML = htmlCode;

  const removeButtons = books.querySelectorAll('button');
  removeButtons.forEach((book) => {
    book.addEventListener('click', (event) => {
      removeBook(event.target.dataset.id);
    })
    
  });
}

//  ------------- ADD BOOK -------------------------------
function addBook(bookObj) {
  if (localStorage.getItem('bookdata')){
    const books =  JSON.parse(localStorage.getItem('bookdata'));
    books.unshift(formData);
    localStorage.setItem('bookdata', JSON.stringify(books));
    showBooks(books);
  } else {
    localStorage.setItem('bookdata', JSON.stringify([formData]))
    showBooks( JSON.parse(localStorage.getItem('bookdata')));
  }
  author.value='';
  title.value='';
}

//  ------------- REMOVE BOOK -------------------------------
function removeBook(bookId) {
     const filtered = JSON.parse(localStorage.getItem('bookdata')).filter((item) =>item.id!=bookId);
     localStorage.setItem('bookdata', JSON.stringify(filtered));
     showBooks(filtered);
}
