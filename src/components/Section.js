export default class Section {
  constructor({ items, renderer }, gallerySelector) {
      this._items = items;
      this._renderer = renderer;
      this._itemsGallery = document.querySelector(gallerySelector);
  }
  renderCards() {
      this._items.forEach((item) => {
        this._renderer(item);
      });
  }

  addItem(element) {
      this._itemsGallery.prepend(element);
  };
}