const refs = {
    startBtn: document.querySelector('[data-start]'),
    stopBtn: document.querySelector('[data-stop]'),
    bodyRef: document.querySelector('body'),
};

let timerId = null;
const INTERVAL_DURATION = 1000;
refs.startBtn.disabled = false;
refs.stopBtn.disabled = true;

function updateBodyBgColor (){
    refs.bodyRef.style.backgroundColor =  getRandomHexColor();
}  

refs.startBtn.addEventListener('click', onStartBtnClick);
refs.stopBtn.addEventListener('click', onStopBtnClick);

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function onStartBtnClick() {
    timerId = setInterval(updateBodyBgColor, INTERVAL_DURATION);
    refs.startBtn.disabled = true;
    refs.stopBtn.disabled = false;

    console.log("Change the background color");
};

function onStopBtnClick() {
    refs.startBtn.disabled = false;
    refs.stopBtn.disabled = true;
    clearInterval(timerId);

    console.log('Stop the timer');
};