const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

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
// Карточки
let cardsGallery = document.querySelector('.cards__list');
let cardTemplate = document.querySelector('.card-template').content.querySelector('.card__item');
// Попап добавления карточек
let popupNewCard = document.querySelector ('.profile__button-add');
let popupCard = document.querySelector ('.popup_type_card');
let addCardForm = document.querySelector('.popup__form-card');
let popupCardClose = document.querySelector ('.popup__close-card');
let popupCardTitle = document.querySelector ('.popup__title');
let inputCardFormName = addCardForm.querySelector('.popup__input_type_card');
let inputCardFormLink = addCardForm.querySelector('.popup__input_type_card-link');
let buttonCardForm = addCardForm.querySelector('.popup__submit-button-card');
// Попап фуллфото
const popupFullImage = document.querySelector('.popup_full_photo');
const cardImage = document.querySelector('.card__photo');
const fullImageTitle = popupFullImage.querySelector('.popup__full-name');
const fullImage = popupFullImage.querySelector('.popup__full-image');
const fullImageClose = popupFullImage.querySelector('.popup__close-full');

//Открытие формы профайла 
function openProfile (evt) {
  evt.preventDefault();
  popupProfile.classList.add('popup_opened');
  nameInput.value = nameForm.textContent;
  jobInput.value = jobForm.textContent;
};
popupProfileOpen.addEventListener('click', openProfile);

//Закрытие формы профайла
function closeProfile () {
  popupProfile.classList.remove('popup_opened');
};
popupProfileClose.addEventListener ('click', closeProfile);

document.addEventListener('keydown', function (evt) {
  if (evt.key ==='Escape') {
    popupProfile.classList.remove('popup_opened');
  }
});

//Отправка формы профайла
function handleFormSubmit (evt) {
  evt.preventDefault();
  nameForm.textContent = nameInput.value;
  jobForm.textContent = jobInput.value;
  closeProfile ();
}
popupProfile.addEventListener('submit', handleFormSubmit);

//Открытие формы карточки
function newCardForm () {
  popupCard.classList.add('popup_opened');
};
popupNewCard.addEventListener('click', newCardForm);

//Закрытие формы создания карты
function closePopupCard () {
  popupCard.classList.remove('popup_opened');
};
popupCardClose.addEventListener ('click', closePopupCard);

document.addEventListener('keydown', function (evt) {
  if (evt.key ==='Escape') {
    popupCard.classList.remove('popup_opened');
  }
});

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
  popupFullImage.classList.add('popup_opened');
}

//Закрытие full фото
function closeImageFull () {
  popupFullImage.classList.remove('popup_opened');
};
fullImageClose.addEventListener ('click', closeImageFull);

//Добавление уже данных в массиве карточек
function renderCard () {
  initialCards.forEach((item) => {
    const card = createCard(item);
    cardsGallery.prepend(card);
  });
}
// Добавление карточки по кнопке
function AddFormImage (evt) {
 evt.preventDefault();
  const newCard = createCard({
    name: inputCardFormName.value,
    link: inputCardFormLink.value,
  });
  cardsGallery.prepend(newCard);
  addCardForm.reset();
  closePopupCard();
}

popupCard.addEventListener ('submit', AddFormImage);

document.addEventListener('keydown', function (evt) {
  if (evt.key ==='Escape') {
    popupFullImage.classList.remove('popup_opened');
  }
});

renderCard();