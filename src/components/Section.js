export default class Section {
  constructor({ items, renderer }, gallerySelector) {
      this._items = items;
      this._renderer = renderer;
      this._itemsGallery = document.querySelector(gallerySelector);
  }

  renderCards(items) {
      items.forEach((item) => {
        this._renderer(item);
      });
  }

  addItemPreppend(element) {
      this._itemsGallery.prepend(element);
  };

  addItemAppend(element) {
    this._itemsGallery.append(element);
  }
}
