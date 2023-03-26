// Тут все ок
export default class Card {
  constructor (name, link, cardTemplate, userId, authorData, handleActions) {
    this._name = name;
    this._link = link;
    this._cardTemplate = cardTemplate;
    // Данные для пользователя
    this._userId = userId;
    this._cardId = authorData.cardId;
    this._authorId = authorData.authorId;
    // Данные действий
    this._handleCardClick = handleActions.handleCardClick;
    this._handleCardDelete = handleActions.handleCardDelete;
    this._handleCardLike = handleActions.handleCardLike;
    this._handleDeleteLike = handleActions.handleDeleteLike;
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
    this.likeSelector = this._cardElement.querySelector('.card__like-counter');
    this._setEventListeners();
    return this._cardElement;
  }

  _deleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  // Отображение лайков и их колличества
  renderCardLike(card) {
    this._likeArea = card.likes;
    if (this._likeArea.length === 0) {
      this.likeSelector.textContent = '';
    } else {
      this.likeSelector.textContent = this._likeArea.length;
    }
    if (this._likedCard()) {
      this._cardLike.classList.add('card__like_active');
    } else {
      this._cardLike.classList.remove('card__like_active');
    }
  }

  // А есть ли лайк?ОК
  _likedCard() {
    // Возврат без переменной, так как объявление переменной будет избыточной (Local variable is redundant)
    return this._likeArea.find((userLike) => userLike._id === this._userId);
  }

  // Добавление снятие лайков ОК
  _likeToggleActive() {
    if (this._likedCard()) {
      this._handleDeleteLike(this._cardId);
    } else {
      this._handleCardLike(this._cardId);
    }
  }

  //Слушатели ОК
  _setEventListeners() {
    this._cardLike.addEventListener('click', () => this._likeToggleActive());
    this._photo.addEventListener('click', () => this._handleCardClick(this._name, this._link));
      if (this._userId === this._authorId) {
        this._buttonDelete.addEventListener('click', () => this._deleteCard(this._cardId));
      } else {
        this._buttonDelete.remove();
      }
    }
}
