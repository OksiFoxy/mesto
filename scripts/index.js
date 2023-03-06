import Card from './Card.js';
import { initialCards, selectors } from './constants.js';
import FormValidator from './FormValidator.js';

// Форма редактирования профиля
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');
const popupProfile = document.querySelector('.popup_type_edit');
const popupProfileOpen = document.querySelector('.profile__button-edit');
const popupProfileForm = document.querySelector('.popup__form-profile');
const inputProfileName = document.querySelector('.popup__input_type_name');
const inputProfileAbout = document.querySelector('.popup__input_type_job');
const popupProfileButton = document.querySelector('.popup__submit-button');
// Карточки
const cardsGallery = document.querySelector('.cards__list');
const cardTemplate = document.querySelector('.card-template').content.querySelector('.card');
// Попап добавления карточек
const popupNewCard = document.querySelector('.profile__button-add');
const popupCard = document.querySelector('.popup_type_card');
const popupCardForm = document.querySelector('.popup__form-card');
const popupCardTitle = document.querySelector('.popup__title');
const inputCardFormName = popupCardForm.querySelector('.popup__input_type_card');
const inputCardFormLink = popupCardForm.querySelector('.popup__input_type_card-link');
// Попап фуллфото
const popupFullImage = document.querySelector('.popup_full_photo');
const fullImageTitle = popupFullImage.querySelector('.popup__full-name');
const fullImage = popupFullImage.querySelector('.popup__full-image');
const popupList = Array.from(document.querySelectorAll('.popup'));
const buttonCloseList = document.querySelectorAll('.popup__close');
// Включаем валидацию форм
const validationsProfileForm = validationForm (popupProfile);
const validationsCardForm = validationForm (popupCard);

function validationForm (formElement) {
  const validForm = new FormValidator (selectors, formElement);
  validForm.enableValidation();
  return validForm;
}

buttonCloseList.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});

popupList.forEach((popup) => {
  popup.addEventListener('mousedown', function (evt) {
    if (evt.target.classList.contains('popup_opened') || evt.target.classList.contains('popup__close')) {
      closePopup(popup);
    }
  });
});

// Popups
// Открытие попапов
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupEsc);
  validationsCardForm.resetValidation();
  validationsProfileForm.resetValidation();
}
//Закрытие попапов
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupEsc);
}

buttonCloseList.forEach((button) => {
  const popup = button.closest(".popup");
  button.addEventListener("click", () => closePopup(popup));
});

function closePopupEsc(evt) {
  if (evt.key === 'Escape') {
    const activePopup = document.querySelector('.popup_opened');
    closePopup(activePopup);
  };
}

popupList.forEach((popup) => {
  popup.addEventListener('mousedown', function (evt) {
    if (evt.target.classList.contains("popup_opened") || evt.target.classList.contains("popup__close")) {
      closePopup(popup);
    }
  });
});

//Открытие формы профайла 
function openProfile(evt) {
  openPopup(popupProfile);
  inputProfileName.value = profileName.textContent;
  inputProfileAbout.value = profileAbout.textContent;
}
popupProfileOpen.addEventListener('click', openProfile);

//Открытие формы карточки
function openImageFull() {
  fullImage.src = card.link;
  fullImage.alt = card.name;
  fullImageTitle.textContent = card.name;
  openPopup(popupFullImage);
}

//Отправка формы профайла
function submitFormProfile(evt) {
  evt.preventDefault();
  profileName.textContent = inputProfileName.value;
  profileAbout.textContent = inputProfileAbout.value;
  closePopup(popupProfile);
}
popupProfileForm.addEventListener('submit', submitFormProfile);

function openPopupCard() {
  openPopup(popupCard);
}
popupNewCard.addEventListener('click', openPopupCard);

//Создание карточки
function createCard(item) {
  const card = new Card(item.name, item.link, cardTemplate, openImageFull);
  const cardElement = card.generateCard();
  return cardElement;
}

// Добавление уже данных в массиве карточек
// function renderCards(items) {
//   items.forEach(item => {
//     cardsGallery.prepend(createCard({name: item.name, link: item.link}));
//   });
// };
initialCards.forEach((item) => {
  cardsGallery.prepend(createCard(item.name, item.link));
});

// Отправка формы карточки
function addNewCard(evt) {
  evt.preventDefault();
  cardsGallery.prepend(createCard({name: inputCardFormName.value, link: inputCardFormLink.value }));
  closePopup(popupCard);
};
popupCard.addEventListener('submit', addNewCard);

// renderCards(initialCards);