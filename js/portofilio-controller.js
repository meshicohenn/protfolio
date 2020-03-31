'use strict'

$('.document').ready(function () {
    createProjs();
    renderPortfolio();

});

function renderPortfolio() {
    var projects = getProjects();
    var strHTML = '';
    strHTML = projects.map(proj => {
        return `<div class="col-md-4 col-sm-6 portfolio-item">
          <a class="portfolio-link" data-toggle="modal" onclick="renderModal('${proj.id}')" href="#portfolioModal">
            <div class="portfolio-hover">
              <div class="portfolio-hover-content">
                <i class="fa fa-plus fa-3x"></i>
              </div>
            </div>
            <img class="img-fluid" src="${proj.imgGallery}" alt="">
            </a>
          <div class="portfolio-caption">
            <h4>${proj.name}</h4>
            <p class="text-muted">${proj.title}</p>
            <p class="text-muted">${proj.publishedAt}</p>
          </div>
        </div>`
    });

    $('.gallery').html(strHTML.join(''));
}

function renderModal(id) {
    var proj = getProjectById(id);
    var strHTML = '';
    strHTML =
        `<h2>${proj.name}</h2>
            <p class="item-intro text-muted">${proj.title}</p>
            <img class="img-fluid d-block mx-auto" src="${proj.imgModal}" alt="">
                <p class="desc">${proj.desc}</p>
                <ul class="list-inline">
                    <li>Date: ${proj.publishedAt}</li>
                    <!-- <li>Client: Threads</li>-->
                    <li>Category: ${proj.labels[0]}</li>
                </ul>
                <div><a href="${proj.url}" class="btn btn-primary btn-lg active mb-1" target="_blank" role="button" aria-pressed="true">link</a></div>
                <button class="btn btn-primary" data-dismiss="modal" type="button">
                    <i class="fa fa-times"></i>
            Close Project</button>`;
    $('.modal-project').html(strHTML);
}

function onSubmit() {
    var email = $('.form-email').val();
    var subject = $('.form-text').val();
    var text = $('.form-message').val();

    console.log(email, subject, text);

    //TODO: add enter space between lines
    var sendEmail = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${subject}&body=${text}`
    window.open(sendEmail, '_blank')
}


