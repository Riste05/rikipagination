'use strict';
let co = console.log;

const container = document.getElementById('container');
const containerStrani = document.querySelector('.container-strani');
let card = document.getElementsByClassName('card');
const select = document.getElementById('select');
const button = document.querySelector('.button')


window.addEventListener('DOMContentLoaded', dataAPI);


let html = ``;

function dataAPI() {

   
  fetch('https://randomuser.me/api?results=100')

        .then(res => res.json())
        .then(data => {
            let { results } = data;

            results.forEach((element, i) => {

                html += `
                <div class="card" data-card=${i}>
                    <img src="${element.picture.medium}" alt="">
                    <div class="text">
                        <h3>${element.name.first} ${element.name.last}</h3>
                        <h3>${element.location.city} , ${element.location.country}</h3>
                        <h4>${element.email}</h4>
                        <h3>${element.phone}</h3>
                    </div>
                </div>
                `;
            })
            container.insertAdjacentHTML('afterbegin', html);

        })
}


////////////////////////////////////////////////////////


let page = 1;
let optionValue;  // row
let totalPage;
let pagination;

select.addEventListener('change', function (ele) {


    optionValue = ele.target.value;
    let cards = Array.from(card);
    buttonElement(totalPage, page)


    cards.forEach(ele => {
        ele.style.display = '';
    })

    if (ele.target.value === 'all') {
        cards.forEach(ele => {
            ele.style.display = '';
            button.classList.add('hide')
        })
    }
    else if (ele.target.value !== 'all') {
        cards.slice(optionValue).forEach(ele => {
            ele.style.display = 'none';
            button.classList.remove('hide')

        })
    }
})


// ////////////////////////////////////////////////////

function buttonElement(totalPage, page) {

    let divTag = '';
    let activeDiv;
    let beforePage = page - 1;
    let afterPage = page + 1;
    let cards = Array.from(card);

    // kolku button da se menuva vo zavisnost od option
    totalPage = Math.ceil(cards.length / optionValue);

    // strani so kopcinja da se menuva
    let start = (page - 1) * Number(optionValue);
    let end = start + Number(optionValue);
    pagination = cards.slice(start, end);

    cards.forEach(ele => {
        ele.style.display = 'none';
    })

    // gi dodava samo elementite
    cards.forEach(ele => {
        ele.style.display = 'none'
    })

    pagination.forEach(ele => {
        ele.style.display = '';
    })



    if (page > 2) {
        divTag += `<div onClick="buttonElement(totalPage, 1)">1</div>`;
    }

    // if (page > 3) {
    //     divTag += `<div>...</div>`;
    // }

    if (page === 1) {
        afterPage = afterPage + 1;
    } else if (page === afterPage + 1) {
        afterPage = afterPage + 1;
    }

    if (page === totalPage) {
        beforePage = beforePage - 1;
    } else if (page === beforePage - 1) {
        beforePage = beforePage - 1;
    }

    for (let i = beforePage; i <= afterPage; i++) {

        if (i > totalPage) {
            continue;
        }
        if (i === 0) {
            i = i + 1;
        }

        if (page === i) {
            activeDiv = 'active';
        }
        else {
            activeDiv = '';
        }

        divTag += ` <div class="${activeDiv} data-number=${i}" onClick="buttonElement(totalPage, ${i})">${i}</div>`;

    }

    if (page < totalPage - 1) {
        if (page < totalPage - 3) {
            divTag += `<div>...</div>`;
        }
        divTag += `<div onClick="buttonElement(totalPage, ${totalPage})">${totalPage}</div>`;
    }

    button.innerHTML = divTag;

}


// //////////////////////////////////////////////////














