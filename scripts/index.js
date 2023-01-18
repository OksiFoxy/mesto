// Форма редактирования профиля
let nameForm = document.querySelector ('.profile__name');
let jobForm = document.querySelector ('.profile__about');
let popupProfile = document.querySelector ('.popup');
let popupProfileOpen = document.querySelector ('.profile__button-edit');
let popupProfileForm = document.querySelector ('.popup_form');
let nameInput = document.querySelector ('.popup__input_type_name');
let jobInput = document.querySelector ('.popup__input_type_job');
let popupProfileSave = document.querySelector ('.popup__submit-button');
let popupProfileClose = document.querySelector ('.popup__close');

let popupNewCard = document.querySelector ('.profile__button-add');
let popupCard = document.querySelector ('.popup_type_card');
let nameCardInput = document.querySelector ('.popup__input_type_card-name');
let jobInputLink = document.querySelector ('.popup__input_type_card-link');
let cardName = document.querySelector ('.card__title');
let cardImageLink = document.querySelector ('.card__link');
let popupCardClose = document.querySelector ('.popup__close-card');

// // Открытие формы профайла
function openProfile () {
  popupProfile.classList.add('popup_opened');
  nameInput.value = nameForm.textContent;
  jobInput.value = jobForm.textContent;
};

popupProfileOpen.addEventListener('click', openProfile);

// Закрытие формы профайла
function closeProfile () {
  popupProfile.classList.remove('popup_opened');
};

popupProfileClose.addEventListener ('click', closeProfile);

// Отправка формы профайла
function handleFormSubmit (evt) {
  evt.preventDefault();
  nameForm.textContent = nameInput.value;
  jobForm.textContent = jobInput.value;
  console.log('Изменения сохранены');
  closeProfile ();
}

popupProfile.addEventListener('submit', handleFormSubmit);

// Открытие формы карты
function newCardForm () {
  popupCard.classList.add('popup_opened');
  nameCardInput.value = cardName.textContent;
  jobInputLink.value = cardImageLink.textContent;
};

popupNewCard.addEventListener('click', newCardForm);

// Закрытие формы rfhns
function closePopupCard () {
  popupCard.classList.remove('popup_opened');
};

popupCardClose.addEventListener ('click', closePopupCard);