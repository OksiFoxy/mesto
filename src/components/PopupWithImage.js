import Popup from "./Popup";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupFullImage = document.querySelector('.popup_full_photo');
    this._fullImage = this._popupFullImage.querySelector('.popup__full-image');
    this._fullImageTitle = this._popupFullImage.querySelector('.popup__full-name');
  }

// Переделанный openFullImage
  open(name, link) {
    this._fullImage.src = link;
    this._fullImage.alt = name;
    this._fullImageTitle.textContent = name;
    super.open();
  }
}