'use strict'

var gProjs = [];

function initPage() {
    createProjs();
}

function createProjs() {
    gProjs.push(createProj('mine', 'mine sweeper',
        'open the cells carefully',
        'game board from 1960, the objective of the game is to clear a rectangular board containing hidden "mines" or bombs without detonating any of them, with help from clues about the number of neighboring mines in each field.',
        'https://meshicohenn.github.io/Mines-sweeper/',
        'img/portfolio/mine-sweeper-gallery.png',
        'img/modal/mine-sweeper-modal.png',
        'March 2020', ['game-board', 'game']));
    gProjs.push(createProj('ballBo', 'ball board',
        'eat the balls',
        'run in the board and collect balls ,be careful from the gluee. when you collect all of the balls you win!',
        'projects/ball-board-start-here/index.html',
        'img/portfolio/ball-board-gallery.png',
        'img/modal/ball-board-modal.png',
        'March 2020', ['game-board', 'game']));
       gProjs.push(createProj('bookSh', 'book shop',
        'eat the balls',
        'run in the board and collect balls ,be careful from the gluee. when you collect all of the balls you win!',
        'projects/book shop/index.html',
        'img/portfolio/book-shop-gallery.png',
        'img/modal/book-shop-modal.png',
        'March 2020', ['game-board', 'game']));
    gProjs.push(createProj('pac', 'pacman',
        'eat the balls',
        'run in the board and collect balls', 'be careful from the gluee. when you collect all of the balls you win!',
        'projects/pacman-starter/index.html',
        'img/portfolio/pacman-gallery.png',
        'img/modal/pacman-modal.png',
        'March 2020', ['game-board', 'game']));

}

function createProj(id, name, title, desc, url, imgGallery, imgModal, publishedAt, labels) {
    return {
        id: id,
        name: name,
        title: title,
        desc: desc,
        imgGallery: imgGallery,
        imgModal: imgModal,
        url: url,
        publishedAt: publishedAt,
        labels: labels
    }
}

function getProjects() {
    return gProjs;
}

function getProjectById(id) {
    var projects = getProjects();
    return projects.find(proj => proj.id === id);
}

