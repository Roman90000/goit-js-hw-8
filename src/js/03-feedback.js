import throttle from 'lodash.throttle';

const formEl = document.querySelector('.feedback-form');

formEl.addEventListener('input', throttle(onInput, 500));
formEl.addEventListener('submit', onFormSubmit);

const LOCALSTORAGE_KEY = 'feedback-form-state';
const { email, message } = formEl.elements;

function onInput(e) {
  dataForm = { email: email.value, message: message.value };
  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(dataForm));
}

loadingPage();

function loadingPage() {
  const localData = localStorage.getItem(LOCALSTORAGE_KEY);
  const parseData = JSON.parse(localData) || {};

  if (parseData) {
    email.value = parseData.email || '';
    message.value = parseData.message || '';
  }
}

function onFormSubmit(evt) {
  evt.preventDefault();

  if (!email.value || !message.value) {
    return alert(`Будь ласка, заповніть всі обов'язкові поля.`);
  }

  localStorage.removeItem(LOCALSTORAGE_KEY);
  document.querySelector('.feedback-form').reset();
}
