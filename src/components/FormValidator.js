export default class FormValidator {
  constructor(selectors, formElement){
    this._selectors = selectors;
    this._formElement = formElement;
    this.inputList = Array.from(this._formElement.querySelectorAll(this._selectors.inputSelector));
    this.buttonElement = this._formElement.querySelector(this._selectors.submitButtonSelector);
  }

  _showInputError = (inputElement) => {
    this.errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    this.errorElement.textContent = inputElement.validationMessage;
    this.errorElement.classList.add(this._selectors.errorClass);
    inputElement.classList.add(this._selectors.inputErrorClass);
  };
  
  _hideInputError = (inputElement) => {
    this.errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    this.errorElement.textContent = '';
    this.errorElement.classList.remove(this._selectors.errorClass);
    inputElement.classList.remove(this._selectors.inputErrorClass);
  };

  // Функция, которая проверяет валидность поля
  //validateInput бывшая
  _isValid = (inputElement) => {
    if (!inputElement.validity.valid) {
        this._showInputError(inputElement);
      } else {
        this._hideInputError(inputElement);
      }
    };

  // Вызовем функцию isValid (validateInput) на каждый ввод символа
  _setEventListeners = () => {
    this._toggleButtonState();
    this.inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
          this._isValid(inputElement);
          this._toggleButtonState();
        });
       });
    };

    enableValidation = () => {
      this._setEventListeners();
    }
  
    resetValidation() {
      this.inputList.forEach((inputElement) => {
        this._hideInputError(inputElement)
      })
      this._toggleButtonState();
    }

  // Блокировка кнопки
  _hasInvalidInput () {
    return this.inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };

  _toggleButtonState ()  {
    if (this._hasInvalidInput()) {
      this.buttonElement.classList.add(this._selectors.inactiveButtonClass);
      this.buttonElement.disabled = true;
    } else {
      this.buttonElement.classList.remove(this._selectors.inactiveButtonClass);
      this.buttonElement.disabled = false;
    }
  }
}