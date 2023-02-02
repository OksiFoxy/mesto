const formElement = document.querySelector('.popup__form');
const inputElement = formElement.querySelector('.popup__input');

const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

formElement.addEventListener('submit', function (evt) {
  evt.preventDefault();
});
inputElement.addEventListener('input', function (evt) {
  console.log(evt.target.validity.valid);
});

const showInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
   errorElement.classList.add('popup__input-error-active');
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  errorElement.classList.remove('popup__input-error-active')
}; 

// Функция, которая проверяет валидность поля
const isValid = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
}; 

// Вызовем функцию isValid на каждый ввод символа
const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(`.popup__input`));
  const buttonElement = formElement.querySelector('.popup__submit-button');

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('.popup__form'));
  formList.forEach((formElement) => {
    setEventListeners(formElement);
  });
};

enableValidation();

// Блокировка кнопки
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
};

const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add('popup__submit-button-inactive');
  } else {
    buttonElement.classList.remove('popup__submit-button-inactive');
  }
};