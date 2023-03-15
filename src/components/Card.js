export default class Card {
  constructor (name, link, cardTemplate, handleCardClick) {
    this._name = name;
    this._link = link;
    this._cardTemplate = cardTemplate;
    this._handleCardClick = handleCardClick;
  }
  // Создание карточки
  generateCard() {
    this._cardElement = this._cardTemplate.cloneNode(true);
    this._photo = this._cardElement.querySelector('.card__photo');
    this._title = this._cardElement.querySelector('.card__title');
    this._photo.alt = this._name;
    this._photo.src = this._link;
    this._title.textContent = this._name;

    this._cardLike = this._cardElement.querySelector('.card__like');  
    this._buttonDelete = this._cardElement.querySelector('.card__delete');
    this._setEventListener();
    return this._cardElement;
  }

  _deleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  _likeToggleActive() {
    this._cardLike.classList.toggle('card__like-active');
  }

  _setEventListener() {
    this._cardLike.addEventListener('click', () => this._likeToggleActive());
    this._buttonDelete.addEventListener('click', () => this._deleteCard());
    this._photo.addEventListener('click', () => this._handleCardClick(this._link, this._name));
  }
}