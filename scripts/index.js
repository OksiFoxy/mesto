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
let cardsContainer = document.querySelector('.gallery');
let cardDeleteButton = document.querySelector ('.card__delete');
let cardImage = document.querySelector ('.card__photo');
let cardName = document.querySelector ('.card__title');
let cardLike = document.querySelector ('.card__like');
let cardTemplate = document.querySelector('.card-template').content.querySelector('.card');
// Попап добавления карточек
let popupNewCard = document.querySelector ('.profile__button-add');
let popupCard = document.querySelector ('.popup_type_card');
let addCardForm = document.querySelector('.popup__form-card');
let popupCardClose = document.querySelector ('.popup__close-card');
let popupCardTitle = document.querySelector ('.popup__title');
let inputCardFormName = addCardForm.querySelector('.popup__input_type_card');
let inputCardFormLink = addCardForm.querySelector('.popup__input_type_card-link');
let buttonCardForm = addCardForm.querySelector('.popup__submit-button-card');

// РАБОТАЕТ Открытие формы профайла 
function openProfile (evt) {
  evt.preventDefault();
  popupProfile.classList.add('popup_opened');
  nameInput.value = nameForm.textContent;
  jobInput.value = jobForm.textContent;
};
popupProfileOpen.addEventListener('click', openProfile);

// РАБОТАЕТ Закрытие формы профайла
function closeProfile () {
  popupProfile.classList.remove('popup_opened');
};
popupProfileClose.addEventListener ('click', closeProfile);

document.addEventListener('keydown', function (evt) {
  if (evt.key ==='Escape') {
    popupProfile.classList.remove('popup_opened');
  }
});

// РАБОТАЕТ Отправка формы профайла
function handleFormSubmit () {
  evt.preventDefault();
  nameForm.textContent = nameInput.value;
  jobForm.textContent = jobInput.value;
  console.log('Изменения сохранены');
  closeProfile ();
}
popupProfile.addEventListener('submit', handleFormSubmit);

// РАБОТАЕТ Открытие формы карточки
function newCardForm () {
  popupCard.classList.add('popup_opened');
};
popupNewCard.addEventListener('click', newCardForm);

// РАБОТАЕТ Закрытие формы создания карты
function closePopupCard () {
  popupCard.classList.remove('popup_opened');
};
popupCardClose.addEventListener ('click', closePopupCard);

document.addEventListener('keydown', function (evt) {
  if (evt.key ==='Escape') {
    popupCard.classList.remove('popup_opened');
  }
});

// РАБОТАЕТ Функция переключение лайка
function likeToggleActive (evt) {
  cardLike.classList.toggle('card__like-active');
}
cardLike.addEventListener ('click', likeToggleActive);

//РАБОТАЕТ НО НА ВСЕ Удаление карты
function deleteCard(evt) {
  cardsContainer.remove();
}
cardDeleteButton.addEventListener('click', deleteCard);

//РАБОТАЕТ добавляются пустые Добавление карточки
function renderCard(cardElement) {
  cardsContainer.append(cardElement);
}

//ВРОДЕ РАБОТАЕТ НО ТОЛЬКО НА ПЕРВУЮ В РАЗМЕТКЕ Создание карточки
function createCard(card) {
  // Клонируем содержимое тега template
  const cardElement = cardTemplate.cloneNode(true);
  // Наполняем содержимым
  // Ссылка на картинку
  cardImage.alt = card.name;
  cardImage.src = card.link;
  // Название карточки
  cardName.textContent = card.name;
  return cardElement;
};

// РАБОТАЕТ ПО КОЛЛИЧЕСТВУ СОЗДАЕТ ПУСТЫЕ Добавление уже данных в массиве карточек
function loadInitialCards(){
  initialCards.forEach(function (card){ 
    const cardElement = createCard(card);
    renderCard(cardElement);
  });
}
loadInitialCards();

// Cобытиe добавления карточки по кнопке
function AddFormSubmit(evt){
 evt.preventDefault();
 const newCard = {
  name: inputCardFormName.value,
  link: inputCardFormLink.value
};
const cardElement = createCard(newCard);
 renderCard(cardElement);
 closePopupCard();
}
addCardForm.addEventListener('submit', AddFormSubmit);

// loadInitialCards();