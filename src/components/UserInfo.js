export default class UserInfo {
  constructor({ profileNameSelector, profileAboutSelector, profileAvatarSelector }) {
      this._profileName = document.querySelector(profileNameSelector);
      this._profileAbout = document.querySelector(profileAboutSelector);
      this._profileAvatar = document.querySelector(profileAvatarSelector);
  }
  // возвращает объект с данными пользователя
  getUserInfo() {
    const userInfo = {
        name: this._profileName.textContent,
        about: this._profileAbout.textContent,
        avatar: this._profileAvatar.src
    }
    return userInfo;
  }
  // принимает новые данные пользователя и добавляет их на страницу
  setUserInfo(values) {
    this._profileName.textContent = values.name;
    this._profileAbout.textContent = values.about;
    this._profileAvatar.src = values.avatar;
  }

}
