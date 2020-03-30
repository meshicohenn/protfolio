'use strict'


function onInitIdex() {
    createBooks();
    renderBooks();
}

function renderBooks() {
    // if (loadFromStorage(KEY).length === 0) return; how to control on the thead table when its empty???
    var books = getBooksForPage();
    var index = 1;
    var strHTML = `<thead class="table-head"><tr>
                        <th>Id</th>
                        <th class="book-name" onclick="onSort('name')">Book name</th>
                        <th class="book-price" onclick="onSort('price')">Price</th>
                        <th colspan="4">Actions</th></tr></thead><tbody class="table-body">`
    strHTML += books.map(book => {
        var bookUrl = book.imgUrl === 'smile' ? BOOKEMOJI : `<img src="${book.imgUrl}"style="width:130px;height:180px;">`;
        return ` 
        <tr><td>${index++}</td>
        <td>${book.name}</td>
        <td class="price${book.id}">${book.price}$</td>
        <td><button onclick="onRead('${book.id}')">Read</button></td>
        <td><button onclick="onUpdate('${book.id}')">Update</button></td>
        <td><button onclick="onDelete('${book.id}')">Delete</button></td>
        <td class="rate-td">
            <button onclick="onRate('${book.id}','plus')">+</button>
            <span>${book.rate}</span>
            <button onclick="onRate('${book.id}','minus')">-</button>
        </td>
        </tr>`
    }).join('');
    strHTML += `</tbody>`;

    document.querySelector('.books-table').innerHTML = strHTML;
    document.querySelector('.book-page').innerText = `${gPageIdx + 1}`;
}

function onMovePage(operation) {
    nextPage(operation);
    renderBooks();
}


function onSort(sortBy) {
    sortBooks(sortBy);
    renderBooks();
}

function onRate(bookId, operation) {
    changeBookRatedPlus(bookId, operation);
    renderBooks();
}

function onDelete(bookId) {
    deleteBook(bookId);
    renderBooks();
}

function onUpdate(bookId) {
    var className = 'price' + bookId;
    var classNameInput = 'new-price' + bookId;
    var elPrice = document.querySelector('.' + className);
    elPrice.innerHTML = `<td><input class="${classNameInput}" type="number" name="new-price" value="">
                        <button onclick="onSaveUpdate('${bookId}')">save</button><td>`;

}

function onSaveUpdate(bookId) {
    var classNameInput = '.new-price' + bookId;
    var elPrice = document.querySelector(classNameInput);
    // debugger
    updateBook(bookId, elPrice.value);
    renderBooks();
}

function onRead(bookId) {
    var book = getBookById(bookId);
    var bookUrl = book.imgUrl === 'smile' ?
        BOOKEMOJI :
        `<img src="${book.imgUrl}">`;
    var text = makeLorem();

    var elModal = document.querySelector('.modal')
    elModal.querySelector('h2').innerText = `${book.name}`;
    elModal.querySelector('.book-img').innerHTML = bookUrl;
    elModal.querySelector('span').innerText = text;
    elModal.hidden = false;
    renderBooks();
}

function onAddBook() {
    const el = document.querySelector('.details-book');
    el.hidden = false;
}

function onSaveBook() {
    const bookName = document.querySelector('input[name="name"]').value;
    const bookPrice = document.querySelector('input[name="price"]').value;

    if (!bookName || !bookPrice) return;
    addNewBook(bookName, bookPrice);
    document.querySelector('.details-book').hidden = true;
    renderBooks();
}

function onCloseModal() {
    document.querySelector('.modal').hidden = true;
}