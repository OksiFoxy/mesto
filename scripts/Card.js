export default class Card {
  constructor (name, link, openImageFull, cardTemplate) {
    this._name = name;
    this._link = link;
    this._cardTemplate = cardTemplate;
    this._openImageFull = openImageFull;
  }

  // Создание карточки
  generateCard() {
    this._сardElement = this._cardTemplate.cloneNode(true);
   
    this._photo = this._cardElement.querySelector('.card__photo');
    this._title = this._cardElement.querySelector('.card__title');
    this._photo.alt = this._name;
    this._photo.src = this._link;
    this._title.textContent = this._name;

    this._cardLike = this._сardElement.querySelector('.card__like');  
    this._buttonDelete = this._сardElement.querySelector('.card__delete');
    this._setEventListener();
    return this._cardElement;
  }

//Удаление карточки
  _deleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

//Лайк карточки
  _likeToggleActive() {
    // this._cardLike.classList.toggle('card__like-active');
    evt.target.classList.toggle('card__like-active');
  }

//Навешивание событий не работает?
  _setEventListener() {
    this._cardLike.addEventListener('click', () => this. _likeToggleActive());
    this._buttonDelete.addEventListener('click', () => this._deleteCard());
    this._photo.addEventListener('click', () => this._openImageFull(this._photo, this._title));
  }
}