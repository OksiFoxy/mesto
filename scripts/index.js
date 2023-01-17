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

// Отправка формы
function handleFormSubmit (evt) {
  evt.preventDefault();
  nameForm.textContent = nameInput.value;
  jobForm.textContent = jobInput.value;
  console.log('Изменения сохранены');
  closeProfile ();
}

popupProfile.addEventListener('submit', handleFormSubmit);
