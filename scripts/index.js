// Форма редактирования профиля
const profileName = document.querySelector ('.profile__name');
const profileAbout = document.querySelector ('.profile__about');
const popupProfile = document.querySelector ('.popup_type_edit');
const popupProfileOpen = document.querySelector ('.profile__button-edit');
const popupProfileForm = document.querySelector ('.popup__form-profile');
const inputProfileName = document.querySelector ('.popup__input_type_name');
const inputProfileAbout = document.querySelector ('.popup__input_type_job');
const popupProfileButton = document.querySelector ('.popup__submit-button');
// Карточки
const cardsGallery = document.querySelector('.cards__list');
const cardImage = document.querySelector('.card__photo');
const cardTemplate = document.querySelector('.card-template').content.querySelector('.card__item');
// Попап добавления карточек
const popupNewCard = document.querySelector ('.profile__button-add');
const popupCard = document.querySelector ('.popup_type_card');
const popupCardForm = document.querySelector('.popup__form-card');
const popupCardTitle = document.querySelector ('.popup__title');
const inputCardFormName = popupCardForm.querySelector('.popup__input_type_card');
const inputCardFormLink = popupCardForm.querySelector('.popup__input_type_card-link');
// Попап фуллфото
const popupFullImage = document.querySelector('.popup_full_photo');
const fullImageTitle = popupFullImage.querySelector('.popup__full-name');
const fullImage = popupFullImage.querySelector('.popup__full-image');

const popupList = Array.from(document.querySelectorAll('.popup'));
const buttonCloseList = document.querySelectorAll('.popup__close');
// Открытие попапов
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupEsc);
}

// Закрытие попапов
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
function openProfile (evt) {
  openPopup(popupProfile);
  inputProfileName.value = profileName.textContent;
  inputProfileAbout.value = profileAbout.textContent;
};
popupProfileOpen.addEventListener('click', openProfile);

//Отправка формы профайла
function submitFormProfile (evt) {
  evt.preventDefault();
  profileName.textContent = inputProfileName.value;
  profileAbout.textContent = inputProfileAbout.value;
  closePopup(popupProfile);
}
popupProfileForm.addEventListener('submit', submitFormProfile);

//Открытие формы карточки
function openPopupCard () {
  openPopup(popupCard);
};
popupNewCard.addEventListener('click', openPopupCard);

//Создание карточки
function createCard(card) {
  // Клонируем содержимое тега template
  const cardElement = cardTemplate.cloneNode('true');
  const cardImage = cardElement.querySelector ('.card__photo');
  const cardName = cardElement.querySelector ('.card__title');
  // Наполняем содержимым
  // Ссылка на картинку и имя
  cardImage.alt = card.name;
  cardImage.src = card.link;
  // Название карточки
  cardName.textContent = card.name;
  // Удаление карточки
  const cardDeleteButton = cardElement.querySelector ('.card__delete');
  cardDeleteButton.addEventListener('click', deleteCard);
  // Лайк карточки
  const cardLike = cardElement.querySelector ('.card__like');
  cardLike.addEventListener ('click', likeToggleActive);
    // Увеличение фото карточки
  cardImage.addEventListener("click", () => {
    openImageFull(card);
  });
  return cardElement;
};

//Функция переключение лайка
function likeToggleActive (evt) {
  evt.target.classList.toggle('card__like-active');
}

//Удаление карты
function deleteCard(evt) {
  evt.target.closest('.card__item').remove();
}

//Увеличение фото
function openImageFull(card) {
  fullImage.src = card.link;
  fullImage.alt = card.name;
  fullImageTitle.textContent = card.name;
  openPopup(popupFullImage);
}

//Добавление уже данных в массиве карточек
function renderCard () {
  initialCards.forEach((item) => {
    const card = createCard(item);
    cardsGallery.prepend(card);
  });
}
// Добавление карточки по кнопке
function addNewCard (evt) {
 evt.preventDefault();
  const newCard = createCard({
    name: inputCardFormName.value,
    link: inputCardFormLink.value,
  });
  cardsGallery.prepend(newCard);
  popupCardForm.reset();
  closePopupCard();
}

popupCard.addEventListener ('submit', addNewCard);

renderCard();