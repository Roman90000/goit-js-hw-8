import throttle from 'lodash.throttle';

const formEl = document.querySelector('.feedback-form');

formEl.addEventListener('input', throttle(onInput, 500));
formEl.addEventListener('submit', onFormSubmit);

const LOCALSTORAGE_KEY = 'feedback-form-state';

loadingPage();

let dataForm = {};

function onInput(e) {
  dataForm[e.target.name] = e.target.value;
  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(dataForm));
}

function loadingPage() {
  const localData = localStorage.getItem(LOCALSTORAGE_KEY);
  const parseData = JSON.parse(localData);

  if (parseData) {
    formEl[0].value = parseData.email || '';
    formEl[1].value = parseData.message || '';
  }
}

function onFormSubmit(evt) {
  evt.preventDefault();

  if (!formEl[0].value || !formEl[1].value) {
    return alert(`Будь ласка, заповніть всі обов'язкові поля.`);
  }

  localStorage.removeItem(LOCALSTORAGE_KEY);
  document.querySelector('.feedback-form').reset();
}
