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


// add slider

const sliderImages = document.querySelectorAll('.item');
const sliderLine = document.querySelector('.item-container');
const nextBtn = document.querySelector('.nextBtn');
const prevBtn = document.querySelector('.prevBtn');
const points = document.querySelectorAll('.progress');
const pointWrappers = document.querySelectorAll('.point')
const slider = document.querySelector('.slider');

let counter = 0;
let sliderWidth;

function showSlide() {
    sliderWidth = document.querySelector(".slider").offsetWidth;
    sliderLine.style.width = `${sliderWidth * sliderImages.length}px`;
    sliderImages.forEach((item) => item.style.width = `${sliderWidth}px`);
}

window.addEventListener('resize', showSlide);
window.addEventListener('load', showSlide);
let currentWidth;
let progressBar;

function showProgress(el, startWidth) {
    width = startWidth;
    progressBar = setInterval(fillLine, 50);
    function fillLine() {
        if (width >= 100) {
            clearInterval(progressBar)
            el.style.width = '0%';
            nextSlide()
            rollSlider()
            showProgress(points[counter], 1)
        } else {
            width++;
            el.style.width = `${width}%`;
            currentWidth = width
        }
    }
}

showProgress(points[0], 1)

function stopBar() {
    points.forEach((item) => item.style.width = '0%')
    clearInterval(progressBar);
}



sliderLine.addEventListener('mouseover', function(e) {
    clearInterval(progressBar);
}) 

sliderLine.addEventListener('mouseout', function() {
    showProgress(points[counter], currentWidth)
}) 


function nextSlide() {
    counter++;
    if (counter >= sliderImages.length) {
        counter = 0;
    }
    rollSlider();
}

function prevSlide() {
    counter--;
    if (counter < 0) {
        counter = sliderImages.length - 1;
    }
    rollSlider()
}

prevBtn.addEventListener('click', function() {
    stopBar();
    prevSlide();
    showProgress(points[counter], 1)
});
nextBtn.addEventListener('click', function() {
    stopBar();
    nextSlide();
    showProgress(points[counter], 1)

})

function rollSlider() {
    sliderLine.style.transform = `translateX(${-counter * sliderWidth}px)`
}


// add swiper

let startX = 0;
let startY = 0;
let distX = 0;
let distY = 0;

let startTime = 0;
let endTime = 0;

let distance = 150;
let limitation = 100;
let allowedTime = 300;


slider.addEventListener('touchstart', function(e) {
    const buttonTarget = e.target.closest('.flag')
    if(buttonTarget) {
        stopBar();
       if (buttonTarget.classList.contains('nextBtn')) {
        nextSlide()
       } else if (buttonTarget.classList.contains('prevBtn')) {
        prevSlide()
       }
       currentWidth = 0;
    }

    let touchObj = e.changedTouches[0];
    startX = touchObj.pageX;
    startY = touchObj.pageY
    startTime = Date.now();

    clearInterval(progressBar)
    e.preventDefault()
})

slider.addEventListener('touchend', function(e) {
    e.preventDefault()
    let touchObj = e.changedTouches[0];
    distX = touchObj.pageX - startX;
    distY = touchObj.pageY - startY;
    endTime = Date.now() - startTime;

    showProgress(points[counter], currentWidth)


    if (endTime <= allowedTime) {
        if (Math.abs(distX) > distance && Math.abs(distY) <= limitation) {
            stopBar();
            if(distX > 0) {
                prevSlide();
            } else {
                nextSlide();
            }
            showProgress(points[counter], 1)
        } 
    }
})

slider.addEventListener('touchmove', function(e) {
    e.preventDefault()
})
