// Форма редактирования профиля
let nameForm = document.querySelector ('.profile__title');
let jobForm = document.querySelector ('.profile__subtitle');
let popupProfile = document.querySelector ('.popup');
let popupProfileOpen = document.querySelector ('.profile__button-edit');
let popupProfileForm = document.querySelector ('.popup__form');
let nameInput = document.querySelector ('.popup__input-name');
let jobInput = document.querySelector ('.popup__input-job');
let popupProfileSave = document.querySelector ('.popup__submit-button');
let popupProfileClose = document.querySelector ('.popup__close-form');

// // Открытие формы профайла
popupProfileOpen.addEventListener('click', function openProfile () {
  popupProfile.classList.add('popup_opened');
});

// Закрытие формы профайла
function closeProfile () {
  popupProfile.classList.remove('popup_opened');
};

popupProfileClose.addEventListener ('click', closeProfile);

// Отправка формы
popupProfile.addEventListener('submit', function handleFormSubmit (evt) {
  evt.preventDefault();
  nameForm.textContent = nameInput.value;
  jobForm.textContent = jobInput.value;
  console.log('Изменения сохранены');
  closeProfile ();
});
