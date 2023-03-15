import Card from "../components/Card.js";
import { initialCards, selectors } from '../components/constants.js';
import FormValidator from '../components/FormValidator.js';
// import '../pages/index.css'
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";

// Форма редактирования профиля
const popupProfile = document.querySelector('.popup_type_edit');
const buttonProfileOpen = document.querySelector('.profile__button-edit');
const inputProfileName = document.querySelector('.popup__input_type_name');
const inputProfileAbout = document.querySelector('.popup__input_type_job');
// Карточки
const cardTemplate = document.querySelector('.card-template').content.querySelector('.card__item');
// Попап добавления карточек
const buttonNewCard = document.querySelector('.profile__button-add');
const popupCard = document.querySelector('.popup_type_card');
const formPopupCard = document.querySelector('.popup__form-card');

// ВАЛИДАЦИЯ ОК
const validationsProfileForm = new FormValidator (selectors, popupProfile);
validationsProfileForm.enableValidation();

const validationsCardForm = new FormValidator (selectors, popupCard);
validationsCardForm.enableValidation();

// ПОПАП ФУЛЛ ФОТО
const popupFullImage = new PopupWithImage('.popup_full_photo');

const handleCardClick = (name, link) => {                                
  popupFullImage.open(name, link);
};
popupFullImage.setEventListeners();

//Создание карточки оставляем
function createCard(item) {
  const card = new Card(item.name, item.link, cardTemplate, handleCardClick);
  const cardElement = card.generateCard();
  return cardElement;
}

// Добавление уже данных в массиве карточек меняем с помощью класса Section
const itemsGallery = new Section ({
  items: initialCards,
  renderer: (item) => {
    const cardElement = createCard ({name: item.name, link: item.link});
    itemsGallery.addItem(cardElement);
  }},
  ".cards__list"
);
itemsGallery.renderCards();

// Открытие формы новой карточки переделать в экземпляр новый формы
const openPopupCard = () => {
  formPopupCard.reset();
  validationsCardForm.resetValidation();
  popupAddNewCard.open();
}
buttonNewCard.addEventListener('click', openPopupCard);

// Отправка формы карточки переделать экземпляр карточки
const popupAddNewCard = new PopupWithForm(".popup_type_card", {
  submitForm: (data) => {
    const newCard = createCard(data);
    itemsGallery.addItem(newCard);
    }
  },
)
popupAddNewCard.setEventListeners();

// ПРОФИЛЬ тут где то должен быть экземпляр?
const profileNewInfo = new UserInfo({
  profileNameSelector: ".profile__name",
  profileAboutSelector: ".profile__about",
})

const popupEditProfile = new PopupWithForm(".popup_type_edit", {
  submitForm: (data) => {
    console.log(data);
    profileNewInfo.setUserInfo(data.name, data.about);
    popupEditProfile.close();
    }
} 
)
popupEditProfile.setEventListeners();

//Открытие формы профайла
const openProfile = () => {
  const dataUser = profileNewInfo.getUserInfo();
  inputProfileName.value = dataUser.name;
  inputProfileAbout.value = dataUser.about;
  popupEditProfile.open();
}
buttonProfileOpen.addEventListener('click', openProfile);