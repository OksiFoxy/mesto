const selectors = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button-inactive',
  inputErrorClass: "popup__input_type_error",
  errorClass: 'popup__input-error-active'
};

const showInputError = (formElement, inputElement, selectors) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  errorElement.textContent = inputElement.validationMessage;
  errorElement.classList.add(selectors.errorClass);
  inputElement.classList.add(selectors.inputErrorClass);
}

const hideInputError = (formElement, inputElement, selectors) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  errorElement.textContent = '';
  errorElement.classList.remove(selectors.errorClass);
  inputElement.classList.remove(selectors.inputErrorClass);
}

// Функция, которая проверяет валидность поля
const validateInput = (formElement, inputElement, selectors) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, selectors);
  } else {
    hideInputError(formElement, inputElement, selectors);
  }
}

// Вызовем функцию validateInput на каждый ввод символа
const setEventListeners = (formElement, buttonElement, selectors) => {
  const inputList = Array.from(formElement.querySelectorAll(selectors.inputSelector));
  toggleButtonState(inputList, buttonElement, selectors);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      validateInput(formElement, inputElement, selectors);
      toggleButtonState(inputList, buttonElement, selectors);
    });
  });
}

// Блокировка кнопки
const hasInvalidInput = (inputList) => {
  return inputList.some(inputElement =>
    !inputElement.validity.valid);
}

const onDisableButton = (buttonElement, selectors) => {
  buttonElement.classList.add(selectors.inactiveButtonClass);
  buttonElement.setAttribute('disabled', 'disabled');
}

const offDisableButton = (buttonElement, selectors) => {
  buttonElement.classList.remove(selectors.inactiveButtonClass);
  buttonElement.removeAttribute('disabled');
}

const toggleButtonState = (inputList, buttonElement, selectors) => {
  if (hasInvalidInput(inputList)) {
    onDisableButton(buttonElement, selectors);
  } else {
    offDisableButton(buttonElement, selectors);
  }
}

// Функция с валидацией
function enableValidation(selectors) {
  const formList = Array.from(document.querySelectorAll(selectors.formSelector));
  formList.forEach((formElement) => {
    const submitButton = formElement.querySelector(selectors.submitButtonSelector);
    formElement.addEventListener("submit", () => {
      onDisableButton(submitButton, selectors);
    });
    setEventListeners(formElement, submitButton, selectors);
  });
}

enableValidation(selectors);