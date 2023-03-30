import Card from "../components/Card.js";
import { selectors } from '../utils/constants.js';
import FormValidator from '../components/FormValidator.js';
import '../pages/index.css'
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithDelete from "../components/PopupWithDelete";
import UserInfo from "../components/UserInfo.js";
import { apiConfig } from "../utils/apiConfig.js";
import Api from "../components/Api.js";

const popupProfile = document.querySelector('.popup_type_edit');
const buttonProfileOpen = document.querySelector('.profile__button-edit');
const profileAvatar = document.querySelector('.profile__avatar');
const buttonProfileAvatar = document.querySelector('.profile__avatar-button');
const inputProfileName = document.querySelector('.popup__input_type_name');
const inputProfileAbout = document.querySelector('.popup__input_type_job');

// Карточки
const cardTemplate = document.querySelector('.card-template').content.querySelector('.card__item');
const itemsGallery = document.querySelector('.profile__button-add');
// Попап добавления карточек
const buttonNewCard = document.querySelector('.profile__button-add');
const popupCard = document.querySelector('.popup_type_card');
const formPopupCard = document.querySelector('.popup__form-card');
const popupAvatar = document.querySelector('.popup_avatar');
const formPopupAvatar = document.querySelector('.popup__form-avatar');

// ВАЛИДАЦИЯ
const validationsProfileForm = new FormValidator (selectors, popupProfile);
validationsProfileForm.enableValidation();

const validationsCardForm = new FormValidator (selectors, popupCard);
validationsCardForm.enableValidation();

const validationsAvatarForm = new FormValidator (selectors, popupAvatar);
validationsAvatarForm.enableValidation();

const api = new Api(apiConfig);

// Переменная ID пользователя
let userId;

//-----------------------------------------ОТРИСОВЫВАЕМ ЧТО ЕСТЬ--------------------------------------------------------
function createCard(item) {
  const card = new Card(item.name, item.link, item.likes, cardTemplate, userId, {cardId: item._id, authorId: item.owner._id, }, {
    // Добавление лайка
    handleCardLike: (cardId) => {
      api.putCardLike(cardId)
        .then((res) => {
          card.renderCardLike(res.likes);
        })
        .catch((err) => { console.log(`Ошибка лайка, ${err}`) })
    },
    // Удаление лайка
    handleDeleteLike: (cardId) => {
      api.deleteCardLike(cardId)
        .then((res) => {
          card.renderCardLike(res.likes);
        })
        .catch((err) => {console.log(`Ошибка дизлайка, ${err}`) })
    },
     // Увеличение
     handleCardClick: (link, name) => {popupFullImage.open(name, link)},
     // Удаление
     handleCardDelete: (cardElement, cardId) => {popupCardDelete.open(cardElement, cardId)},
  });
  const cardElement = card.generateCard();
  return cardElement;
}

// Добавление уже данных в массиве карточек, было из массива, должно из сервера.
const cardsSection = new Section ({
  renderer: (item) => {
    cardsSection.addItem(createCard(item));
  }},
  ".cards__list"
);

// ДАННЫЕ ПРОФИЛя
const profileUser = new UserInfo({
  profileNameSelector: ".profile__name",
  profileAboutSelector: ".profile__about",
  profileAvatarSelector: ".profile__avatar"
})

// -------------------------------Получаем данные профиля и карточек вместе------------------------------------
Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, items]) => {
    userId = userData._id;
    profileUser.setUserInfo(userData);
    profileUser.setUserAvatar(userData.avatar);
    cardsSection.renderCards(items);
  })
  .catch((err) => {
    console.log('Ошибка при получении данных юзера и карточек: ', err);
    profileUser.setUserInfo({profileNameSelector: 'Жак-Ив Кусто', profileAboutSelector: 'Исследователь океанов'});
    document.querySelector('.photo-err').innerHTML = `<p style='text-align: center'>Что-то не так :(</p>`
  })
//__________________________________________ЭКЗЕМПЛЯРЫ КЛАССОВ ПОПАПОВ_____________________________________________
// ---------------------------------------ПОПАП ФУЛЛ ПРОСМОТРА КАРТОЧКИ---------------------------------------------------
const popupFullImage = new PopupWithImage(".popup_full_photo");

// СЛУШАТЕЛЬ ФОРМЫ
popupFullImage.setEventListeners();
// ------------------------------------ПОПАП УДАЛЕНИЯ КАРТОЧКИ------------------------------------------------
const popupCardDelete = new PopupWithDelete(".popup_card-delete", {
  cardDelete: (cardId, cardElement) => {
    popupCardDelete.proccessActionButtonText('Удаление');
    api.deleteCard(cardId)
      .then(() => {
        cardElement.deleteCard();
        popupCardDelete.close();
      })
      .catch(err => console.log('При удалении произошла ошибка: ', err))
      .finally(() => popupCardDelete.finalActionButtonText('Да'))
  }
});
// СЛУШАТЕЛЬ ФОРМЫ
popupCardDelete.setEventListeners();
// -----------------------------------ПОПАП РЕДАКТИРОВАНИЯ ПРОФИЛЯ----------------------------------------------
const popupEditProfile = new PopupWithForm(".popup_type_edit", {
  submitForm: (values) => {
    popupEditProfile.proccessActionButtonText('Сохранение')
    api.setUserInfo({
      name: values.name,
      about: values.about
    })
      .then(() => {
        profileUser.setUserInfo(values);
        popupEditProfile.close();
      })
      .catch(err => console.log('Ошибка: ', err))
      .finally(() => popupEditProfile.finalActionButtonText('Сохранить'))
  }
});

// Слушатель кнопки попапа с формой редактирования профиля
buttonProfileOpen.addEventListener('click', () => {
  popupEditProfile.open();
  profileUser.setUserInfo(profileUser.getUserInfo());
});

// СЛУШАТЕЛЬ ФОРМЫ
popupEditProfile.setEventListeners();
// --------------------------------------------ПОПАП АВАТАРА-------------------------------------------------
const popupEditAvatar = new PopupWithForm(".popup_avatar", {
  submitForm: (value) => {
    popupEditAvatar.proccessActionButtonText('Сохранение');
    api.setUserAvatar({
      avatar: value.avatarlink
    })
      .then((value) => {
        console.log(value.avatar)
        profileUser.setUserAvatar(value.avatar)
        popupEditAvatar.close();
      })
      .catch()
      .finally(() => popupEditAvatar.finalActionButtonText('Сохранить'))
  }
});

// Слушать кнопки попапа с формой редактирования аватара
buttonProfileAvatar.addEventListener('click', () => {
  validationsAvatarForm.resetValidation();
  popupEditAvatar.open();
});

//СЛУШАТЕЛЬ ФОРМЫ
popupEditAvatar.setEventListeners();
// --------------------------------------------КАРТОЧКИ--------------------------------------------------------
// Отправка формы карточки
const popupAddNewCard = new PopupWithForm(".popup_type_card", {
  submitForm: (values) => {
    popupAddNewCard.proccessActionButtonText('Создание');
    api.createCardApi({name: values.name, link: values.link})
      .then((card) => {
        cardsSection.addItem(createCard(card));
        popupAddNewCard.close();
      })
      .catch(err => console.log('Ошибка при добавлении карточки: ', err))
      .finally(() => popupAddNewCard.finalActionButtonText('Создать'))
  }
});

// Слушатель кнопки открытия попапа с формой добавления фото
buttonNewCard.addEventListener('click', () => {
  validationsCardForm.resetValidation();
  popupAddNewCard.open();
});


// СЛУШАТЕЛЬ ФОРМЫ
popupAddNewCard.setEventListeners();
