'use strict'
const KEY = 'books';
const BOOKEMOJI = '📚';
var gSortBy;
var gPageIdx = 0;
const PAGE_SIZE = 3;

var gBooks = [
    { id: makeId(), name: 'king of Hummus', price: 50, imgUrl: 'img/Hummus.jpg', rate: 10 },
    { id: makeId(), name: 'Bagel Wisdom', price: 40, imgUrl: 'img/Bagel.jpg', rate: 9 },
    { id: makeId(), name: 'the perfect idiut', price: 30, imgUrl: 'img/idiut.jpg', rate: 8 }

];

function getIndexBook(bookId) {
    return gBooks.findIndex(book => book.id === bookId);
}

function getBooks() {
    return gBooks;
}

function getBooksForPage() {
    var startIdx = gPageIdx * PAGE_SIZE;
    return gBooks.slice(startIdx, startIdx + PAGE_SIZE);
}

function nextPage(operation) {
    if (operation === 'plus' && gBooks.length > (gPageIdx + 1) * PAGE_SIZE) {
        gPageIdx++;
    }
    if (operation === 'minus' && gPageIdx !== 0) {
        gPageIdx--;
    }
}

function getBookById(bookId) {
    return gBooks.find(book => book.id === bookId);
}

function sortBooks(sortBy) {
    gSortBy = sortBy;
    gBooks.sort(compare);
    _saveBooksToStorage();
}

function compare(book1, book2) {
    if (gSortBy === 'name') {
        if (book1.name.charAt(0) < book2.name.charAt(0))
            return -1;
        else if (book1.name.charAt(0) > book2.name.charAt(0))
            return 1;
        return 0;
    }
    if (gSortBy === 'price') {
        if (book1.price < book2.price)
            return -1;
        else if (book1.price > book2.price)
            return 1;
        return 0;
    }
}


function changeBookRatedPlus(bookId, operation) {
    var book = getBookById(bookId);
    if (operation === 'plus') book.rate++;
    if (operation === 'minus') book.rate--;
    _saveBooksToStorage();
}

function addNewBook(name, price) {
    var book = _createBook(name, price);
    gBooks.push(book);
    _saveBooksToStorage();
}

function updateBook(bookId, newPrice) {
    var book = gBooks[getIndexBook(bookId)];
    if (!newPrice) newPrice = book.price;
    book.price = parseInt(newPrice);
    _saveBooksToStorage();
}

function deleteBook(bookId) {
    const bookIdx = gBooks.findIndex(book => book.id === bookId);
    gBooks.splice(bookIdx, 1);
    _saveBooksToStorage();
}

function _createBook(name, price, imgUrl, rate) {
    if (!imgUrl) imgUrl = 'smile';
    if (!rate) rate = 0;
    return {
        id: makeId(),
        name: name,
        price: price,
        imgUrl: imgUrl,
        rate: rate
    };
}

function createBooks() {
    // debugger
    const books = loadFromStorage(KEY);
    if (books && books.length !== 0) gBooks = books;
    _saveBooksToStorage();
}

function _saveBooksToStorage() {
    saveToStorage(KEY, gBooks);
}