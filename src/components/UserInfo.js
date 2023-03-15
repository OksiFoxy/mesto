export default class UserInfo {
  constructor({ profileName, profileAbout }) {
      this._profileName = document.querySelector(profileName);
      this._profileAbout = document.querySelector(profileAbout);
  }

  getUserInfo() {
    const userInfo = {
        name: this._profileName.textContent,
        about: this._profileAbout.textContent,
    }
    return userInfo;
  }
  setUserInfo(name, about) {
    this._profileName.textContent = name;
    this._profileAbout.textContent = about;
  }
}