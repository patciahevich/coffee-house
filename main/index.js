const burger_btn = document.querySelector('.burger')
const menu = document.querySelector('.burger-menu')
const body = document.querySelector('body')

burger_btn.addEventListener('click', function() {
    menu.classList.toggle('active')
    burger_btn.classList.toggle('active')
    body.classList.toggle('active')
})

menu.addEventListener('click', function() {
    menu.classList.remove('active')
    burger_btn.classList.remove('active')
    body.classList.remove('active')
})



import data from './products.js';

const coffeeItems = data.filter((item) => item.category === 'coffee');
const teaItems = data.filter((item) => item.category === 'tea');
const dessertItems = data.filter((item) => item.category === 'dessert');


const modal = document.querySelector('.modal');
const popUpImg = document.querySelector('.pop-up-img')
const modalName = document.querySelector('.modal-name');
const modalDescription = document.querySelector('.modal-description');

const sizeBtns = document.querySelectorAll('.size-btn')
const sizes = document.querySelectorAll('.vol-size');
const volumes = document.querySelectorAll('.vol');

const addBtns = document.querySelectorAll('.add-btn')
const adds = document.querySelectorAll('.add');

const totalPrice = document.querySelector('.item-price')

const closeBtn = document.querySelector('.close-btn');
let productItems



let items = coffeeItems;

const offerMenu = document.querySelector('.offer-menu');
const loadBtn = document.querySelector('.load')

function createElement(obj) {
    const container = document.createElement('div');
    const imgWrapper = document.createElement('div');
    const itemDescription = document.createElement('div');
    const img = document.createElement('img');
    const title = document.createElement('h5');
    const description = document.createElement('p');
    const price = document.createElement('h5');

    container.classList.add('menu-item');
    imgWrapper.classList.add('img-wrapper');
    itemDescription.classList.add('item-description');
    price.classList.add('price');
    
    const currentPrice = (obj.price);

    img.src = obj.src;
    img.alt = obj.category;
    title.innerText = obj.name
    description.innerText = obj.description
    price.innerText = `$${currentPrice}`

    itemDescription.append(title, description, price)
    imgWrapper.append(img)
    container.append(imgWrapper, itemDescription)

    container.addEventListener('click', function() {
        if (popUpImg.firstChild) {
            popUpImg.removeChild(popUpImg.firstChild);
        }
        openModal();
        createModalElement(obj);
    })

   return container
}

let sizeMap;
let volMap;
let addMap;
let price;

function createModalElement(el) {
    const img = document.createElement('img');
    img.src = el.src;
    img.alt = el.category;
    popUpImg.append(img);

    modalName.innerText = el.name;
    modalDescription.innerText = el.description;

    sizeMap = Object.keys(el.sizes);
    volMap = Object.values(el.sizes);
    addMap = el.additives;

    sizes.forEach((item, index) => item.innerText = sizeMap[index].toUpperCase());
    volumes.forEach((item, index) => item.innerText = volMap[index].size);

    adds.forEach((item, index) => item.innerText = addMap[index].name);

    price = +el.price;
    totalPrice.innerText = `$${price.toFixed(2)}`
}

sizeBtns.forEach((item, index) => {
    item.addEventListener('click', function() {
        chooseSize(item, index)
    })
});


function chooseSize(el, index) {
    sizeBtns.forEach((item) => {
        item.classList.remove('active');
        item.removeAttribute('disabled')
    });
    el.classList.add('active');
    el.setAttribute('disabled', 'true');

    
    const addPrice = +Object.values(volMap[index])[1]; // get add-price
    const initPrice = price;
    const currantPrice =  initPrice + addPrice;
    totalPrice.innerText = `$${currantPrice.toFixed(2)}`;

    chooseAdds()
}

addBtns.forEach((item) => {
    item.addEventListener('click', function() {
        item.classList.toggle('active');
        chooseAdds();
    })
})

function chooseAdds() {
    let size
    sizeBtns.forEach((item, index) => {
        if (item.classList.contains('active')) {
            size = index;
        }
    })
    let counter = 0;
    addBtns.forEach((item) => {
        if (item.classList.contains('active')) {
            counter++
        }
    })
    
    const addPrice = +Object.values(volMap[size])[1]; // get add-price
    const initPrice = price + addPrice;
    const currentPrice = initPrice + counter * 0.5;
    
    totalPrice.innerText = `$${currentPrice.toFixed(2)}`;
}

window.addEventListener('resize', (e) => {
    while (offerMenu.firstChild) {
        offerMenu.removeChild(offerMenu.firstChild);
    }
    loadBtn.classList.remove('active')
    showCards(items)
});

window.addEventListener('load', () => {
    showCards(coffeeItems)
  });

function showCards(arr) {
    const screenWidth = window.screen.width;
    const elemsToShow = arr.slice(0, screenWidth < 769 ? 4 : arr.length)
    if (screenWidth < 769 && arr.length > 4) {
        loadBtn.classList.add('active')
    }
    
    offerMenu.prepend(...elemsToShow.map((item) => createElement(item)));
}

loadBtn.addEventListener('click', function() {
   addCards(items)
   loadBtn.classList.remove('active')
});

function addCards(arr) {
    const elemsToShow = arr.slice(4, arr.length)
    
    offerMenu.append(...elemsToShow.map((item) => createElement(item)));
}

const offerBtns = document.querySelectorAll('.offer-btn');

offerBtns.forEach((item, index) => {
    item.addEventListener('click', function() {
        offerBtns.forEach((item) => {
            item.classList.remove('active')
            item.removeAttribute("disabled")
        });
        loadBtn.classList.remove('active')
        item.classList.add('active');
        item.setAttribute('disabled', 'true')
        switch (index) {
            case 0 : 
            items = coffeeItems;
            break;
            case 1 : 
            items = teaItems;
            break;
            case 2 : 
            items = dessertItems;
            break;
        }
        console.log(items)
         while (offerMenu.firstChild) {
            offerMenu.removeChild(offerMenu.firstChild);
        }
        showCards(items)
    });
});

// add modal

function openModal() {
    body.classList.add('active');
    modal.classList.add('active');
    setTimeout(function() {
        modal.classList.add('fadeIn')
    }, 300)
}
function closeModal() {
    body.classList.remove('active');
    modal.classList.remove('fadeIn');
    setTimeout(function() {
        modal.classList.remove('active')
    }, 300)

    addBtns.forEach((item) => {
        item.classList.remove('active');
        item.removeAttribute('disabled')
    });
    sizeBtns.forEach((item) => {
        item.classList.remove('active');
        item.removeAttribute('disabled')
    })
    sizeBtns[0].classList.add('active');
    sizeBtns[0].setAttribute('disabled', 'true')
}

modal.addEventListener('click', function(event) {
    if (event.target === modal) {
        closeModal();
    }
})

closeBtn.addEventListener('click', closeModal)













// <div class="menu-item">
// <div class="img-wrapper"><img src="img/menu/coffee-1.jpg" alt="coffee"></div>
// <div class="item-description">
//     <h5>Irish coffee</h5>
//     <p>Fragrant black coffee with Jameson Irish whiskey and whipped milk</p>
//     <h5 class="price">$7.00</h5>
// </div>
// </div>