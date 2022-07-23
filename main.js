const titleInput = document.getElementById('title');
const authorInput = document.getElementById('author');
const isbnInput = document.getElementById('isbn');
const form = document.querySelector('form');
const tBody = document.querySelector('tbody');

form.addEventListener('submit', addBooks);
window.addEventListener('load', () => {
    if (localStorage.getItem('listBooks')) {
        showBooks();
    }
})

function addBooks(e) {
    const bookList = {
        title: titleInput.value,
        author: authorInput.value,
        isbn: isbnInput.value
    };
    let books;
    
    if (titleInput.value == '' || authorInput.value == "" || isbnInput.value =="") {
        console.log('empty');
    } else {
        addToLocalStorage(books, bookList);
    };
    showBooks();
    e.preventDefault();
}

function addToLocalStorage(array,object) {
    if (!localStorage.getItem('listBooks')) {
        array = [];
    } else {
        array = JSON.parse(localStorage.getItem('listBooks'));
    }
    array.push(object);
    localStorage.setItem('listBooks', JSON.stringify(array))
}

function showBooks() {
    books = JSON.parse(localStorage.getItem('listBooks'));
    const data = books.map(item => {
        return `<tr>
                <td>${item.title}</td>
                <td>${item.author}</td>
                <td>${item.isbn}<i class="fas fa-minus-square"></i></td>
                </tr>`
    })
    tBody.innerHTML = data.join('');
}

tBody.addEventListener('click', deleteItem);

function deleteItem(e) {
    const item = e.target;
    if (item.classList.contains("fa-minus-square")) {
        const parent = item.parentElement.parentElement;
        const isbn = item.parentElement.textContent;
        console.log(item.parentElement.textContent);
        for (i = 0; i < books.length; i++){
            if (books[i].isbn == isbn) {
                console.log('yes');
                books.splice(i, 1);
            }
        }
        localStorage.setItem('listBooks', JSON.stringify(books));
        parent.remove();
    }
}