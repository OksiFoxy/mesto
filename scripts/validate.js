const selectors = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button-inactive',
  errorClass: 'popup__input-error-active'
};

const errorElement = (formElement, inputElement) => formElement.querySelector(`.${inputElement.id}-error`);

const inputListAll = (formElement) => Array.from(formElement.querySelectorAll(selectors.inputSelector));

const showInputError = (formElement, inputElement, errorMessage) => {
  errorElement(formElement, inputElement).textContent = errorMessage;
  errorElement(formElement, inputElement).classList.add(selectors.errorClass);
};

const hideInputError = (formElement, inputElement) => {
  errorElement(formElement, inputElement).textContent = '';
  errorElement(formElement, inputElement).classList.remove(selectors.errorClass);
};

// Функция, которая проверяет валидность поля
const isValid = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
}

// Вызовем функцию isValid на каждый ввод символа
const setEventListeners = (formElement) => {
  const buttonElement = formElement.querySelector(selectors.submitButtonSelector);
  inputListAll(formElement).forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement);
      toggleButtonState(inputListAll(formElement), buttonElement);
  });
});
  toggleButtonState(inputListAll(formElement), buttonElement);
};

// Блокировка кнопки
const hasInvalidInput = (inputList) => {
  return inputList.some(inputElement => 
    !inputElement.validity.valid);
}

const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(selectors.inactiveButtonClass);
    buttonElement.setAttribute('disabled', 'disabled');
  } else {
    buttonElement.classList.remove(selectors.inactiveButtonClass);
    buttonElement.removeAttribute('disabled');
  }
};

// Функция с валидацией
const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll(selectors.formSelector));
  formList.forEach((formElement) => {
    setEventListeners(formElement);
  });
};

// Проверяем и обнуляем
const resetValidation = (formElement) => {
  const submitButton = formElement.querySelector(selectors.submitButtonSelector);
  inputListAll(formElement).forEach(inputElement => hideInputError(formElement, inputElement));
  toggleButtonState(inputListAll(formElement), submitButton);
};

enableValidation(selectors);