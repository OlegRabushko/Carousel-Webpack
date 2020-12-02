import './styles/style.scss'

const container = document.querySelector('.slider__container');
const track = document.querySelector('.slider__track');
const itemsAll = document.querySelectorAll('.slider__items');
const btnPrev = document.querySelector('.slider__btn__prev');
const btnNext = document.querySelector('.slider__btn__next');


const slidesToShow = 3;
const slidesToScroll = 2;
let position = 0;
const itemsCount = itemsAll.length;
const itemWidth = container.clientWidth / slidesToShow;
const movePosition = itemWidth * slidesToScroll;

itemsAll.forEach((item) => {
    item.style.minWidth = `${itemWidth}px`;
})
const checkBtns = () => {
    btnPrev.disabled = position === 0;
    btnNext.disabled = position <= -(itemsCount - slidesToShow) * itemWidth;
}
const setPosition = () => {
    track.style.transform = `translateX(${position}px)`
}
const checkPosition = slidesToScroll ? movePosition : itemsLeft * itemWidth;
btnPrev.onclick = () => {
    const itemsLeft = Math.abs(position) / itemWidth;
    position += itemsLeft >= checkPosition;
    setPosition();
    checkBtns();
}
btnNext.onclick = () => {
    const itemsLeft = itemsCount - (Math.abs(position) + slidesToShow * itemWidth) / itemWidth;
    position -= itemsLeft >= checkPosition;
    checkBtns();
    setPosition();
}
checkBtns();

let moving = false;
let mouseLastPosition = 0;
let transform = 0;
let lastPageX = 0;
let transformValue = 0;

if (window.PointerEvent) {
    track.addEventListener('pointerdown', myTouch);
    track.addEventListener('pointermove', myTouchMove);
    track.addEventListener('pointerup', myTouchEnd);
}

function myTouch(e) {
    moving = true;
    mouseLastPosition = e.pageX;
    transform = window.getComputedStyle(track)
        .getPropertyValue('transform') !== 'none'
        ? window.getComputedStyle(track)
            .getPropertyValue('transform').split(',')[4].trim()
        : 0;
}
function myTouchMove(e) {
    if (moving) {
        const diffX = e.pageX - mouseLastPosition;
        if (e.pageX - lastPageX > 0) {
            if (transformValue > 0) {
                return;
            }
        } else {
            if (Math.abs(transformValue) > itemWidth * (itemsCount - slidesToShow)) {
                return;
            }
        }
        transformValue = parseInt(transform) + diffX;
        track.style.transform = `translateX(${transformValue}px)`;
    }
    lastPageX = e.pageX;
}
function myTouchEnd(event) {
    moving = false
}
if (slidesToShow > 4) {
    track.style.fontSize = '18px'
}