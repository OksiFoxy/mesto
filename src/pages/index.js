import Card from "../components/Card.js";
import { initialCards, selectors } from '../components/constants.js';
// import FormValidator from '../components/FormValidator.js';
import '../pages/index.css'
import Section from "../components/Section.js";
import Popup from "../components/Popup.js";
// import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";

// Форма редактирования профиля
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');
const popup = document.querySelector('.popup');
const popupProfile = document.querySelector('.popup_type_edit');
const popupProfileOpen = document.querySelector('.profile__button-edit');
const popupProfileForm = document.querySelector('.popup__form-profile');
const inputProfileName = document.querySelector('.popup__input_type_name');
const inputProfileAbout = document.querySelector('.popup__input_type_job');
const popupProfileButton = document.querySelector('.popup__submit-button');
// Карточки
const itemsGallery = document.querySelector('.cards__list');
const cardTemplate = document.querySelector('.card-template').content.querySelector('.card__item');
// Попап добавления карточек
const popupNewCard = document.querySelector('.profile__button-add');
const popupCard = document.querySelector('.popup_type_card');
const popupCardForm = document.querySelector('.popup__form-card');
const popupCardTitle = document.querySelector('.popup__title');
const inputCardFormName = popupCardForm.querySelector('.popup__input_type_card');
const inputCardFormLink = popupCardForm.querySelector('.popup__input_type_card-link');
// Попап фуллфото
// const popupFullImage = document.querySelector('.popup_full_photo');
// const fullImageTitle = popupFullImage.querySelector('.popup__full-name');
// const fullImage = popupFullImage.querySelector('.popup__full-image');
// const popupList = Array.from(document.querySelectorAll('.popup'));
// const buttonCloseList = document.querySelectorAll('.popup__close');
// // Включаем валидацию форм пока выключила
// const validationsProfileForm = validationForm (popupProfile);
// const validationsCardForm = validationForm (popupCard);

// function validationForm (formElement) {
//   const validForm = new FormValidator (selectors, formElement);
//   validForm.enableValidation();
//   return validForm;
// }

//Создание карточки оставляем
function createCard(item) {
  const card = new Card(item.name, item.link, cardTemplate, handleCardClick);
  const cardElement = card.generateCard();
  return cardElement;
}

// Добавление уже данных в массиве карточек меняем с помощью класса Section
const renderCards = new Section ({
  items: initialCards,
  renderer: (item) => {
    itemsGallery.addItem(createCard({name: item.name, link: item.link}));
  }},
  ".cards__list"
);
renderCards.renderer()

// Открытие формы новой карточки переделать в экземпляр новый формы
function openPopupCard() {
  popupCard.open();
}
popupNewCard.addEventListener('click', openPopupCard);

// Отправка формы карточки переделать экземпляр карточки и потом уже отправку?
const addNewCard = new PopupWithForm(".popup_type_card", {
  submitForm: () => {
    itemsGallery.addItem(createCard({name: inputCardFormName.value, link: inputCardFormLink.value }));
    }
  },
)
addNewCard.setEventListeners()

//Фулл фото попапы пока выключила
// const popupFullImage = new PopupWithImage('.popup_full_photo');

// function handleCardClick(name, link) {                                      
//   popupFullImage.open(name, link);
// };
// popupFullImage.setEventListeners();


// ПРОФИЛЬ тут где то должен быть экземпляр? И валидацию добавить 
const profileInfo = new UserInfo({
  profileNameSelector: ".profile__name",
  profileAboutSelector: ".profile__about",
})
//Открытие формы профайла
function openProfile(profileInfo) {
  popupProfile.open();
  profileInfo.getUserInfo()
}
popupProfileOpen.addEventListener('click', openProfile);

// Отправка формы профайла
function submitFormProfile(evt) {
  evt.preventDefault();
  setUserInfo();
  popupProfile.closePopup();
}
popupProfileForm.addEventListener('submit', submitFormProfile);