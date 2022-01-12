import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
    inputEl: document.querySelector('#datetime-picker'),
    buttonEl: document.querySelector('button[data-start]'),
    timerDiv: document.querySelector('.timer'),
    daysEl: document.querySelector('span[data-days]'),
    hoursEl: document.querySelector('span[data-hours]'),
    minutesEl: document.querySelector('span[data-minutes]'),
    secondsEl: document.querySelector('span[data-seconds]'),
}
refs.buttonEl.classList.add('disabled');
let userDate = null;

function pad (value) {
    return String(value).padStart(2, '0');
}

function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = pad(Math.floor(ms / day));
    const hours = pad(Math.floor((ms % day) / hour));
    const minutes = pad(Math.floor(((ms % day) % hour) / minute));
    const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));

    return { days, hours, minutes, seconds };
}

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose (selectedDates) {
        if (selectedDates[0] < Date.now()) {
            Notify.failure('Date in future');
            userDate = new Date();
        } else { 
            refs.buttonEl.disabled = false;
            refs.buttonEl.classList.remove('disabled');
            userDate = selectedDates[0];
        }
    },
};

class Timer  {
    constructor() {
        this.isActive = false;
        this.timerId = null;
        refs.buttonEl.disabled = true;
    }
    timerStart() {
        if (this.isActive) {
            return;
        }
    this.isActive = true;
    this.timerId = setInterval(()=> {
        const currentTime = Date.now();
        const deltaTime = userDate - currentTime;
        const components = convertMs(deltaTime);

        refs.secondsEl.textContent = components.seconds;
        refs.minutesEl.textContent = components.minutes;
        refs.hoursEl.textContent = components.hours;
        refs.daysEl.textContent = components.days;
            if (deltaTime <= 0) {
                this.timerStop();
                    refs.timerDiv.innerHTML = "Time is over!";
                } 
    }, 1000)

    }
    timerStop() {
        clearInterval(this.timerId);
    }
}

    const timer = new Timer();
    flatpickr(refs.inputEl, options);
    refs.buttonEl.addEventListener('click', () => timer.timerStart());