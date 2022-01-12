import Notiflix from 'notiflix';

const refs = {
  form: document.querySelector('.form'),
  submit: document.querySelector('button'),
};

refs.form.addEventListener('input', onFormInput);
refs.submit.addEventListener('click', onSubmitClick);

let firstDelay = null;
let stepDelay = null;
let amountPromises = null;

function onFormInput(e) {
  firstDelay = Number(e.currentTarget.elements.delay.value);
  stepDelay = Number(e.currentTarget.elements.step.value);
  amountPromises = Number(e.currentTarget.elements.amount.value);
}
function onSubmitClick(e) {
  e.preventDefault();
  
  let delay = firstDelay;
  for (let i = 1; i <= amountPromises; i += 1) {
    createPromise(i, delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(` Rejected promise ${position} in ${delay}ms`);
      });
      delay += stepDelay;
  }
}
function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  let promiseValue = {position, delay};

  return new Promise((resolve, reject) => {
    if (shouldResolve) {
      resolve(promiseValue);
    }
      reject(promiseValue);
  })
}
