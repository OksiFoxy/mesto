export default class Section {
  constructor({ items, renderer }, itemsGallery) {
      this._items = items;
      this._renderer = renderer;
      this._itemsGallery = document.querySelector('.cards__list');
  }
  renderer() {
      this._items.forEach((item) => {
        this._renderer(item);
      });
  }

  addItem(element) {
      this._itemsGallery.prepend(element)
  };
}