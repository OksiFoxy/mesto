// about:"Исследователь гор"
// avatar:"https://pictures.s3.yandex.net/frontend-developer/common/ava.jpg"
// cohort:"cohort-61"
// name:"Оксана"
// _id:"88e6e040d7851706746034a0"
// "likes": []
export default class Api {
  constructor(apiConfig) {
    this._baseUrl = apiConfig.baseUrl;
    this._headers = apiConfig.headers;
  }

  /** Получить данные c сервера или вывести сообщение об ошибке*/
  _checkServerResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Код ошибки: ${res.status}`);
    }
  }

  // Загрузка информации о пользователе с сервера
  // Использовали при отрисовке в начале
  // GET 'https://nomoreparties.co/v1/cohort-61/users/me'
  getUserInfo() {
    return fetch(this._baseUrl + '/users/me', {
      headers: this._headers,
      method: 'GET',
    })
    .then(this._checkServerResponse)
  }

  // Получить карточки с сервера
  // Использовали при отрисовке в начале
  // GET 'https://mesto.nomoreparties.co/v1/cohort-61/cards'
  getInitialCards() {
    return fetch(this._baseUrl + '/cards', {
      headers: this._headers,
      method: 'GET',
    })
    .then(this._checkServerResponse)
  }

  // Добавление карточек
  // Использовать при добавлении по кнопке???
  // POST 'https://mesto.nomoreparties.co/v1/cohort-61/cards'
    // {
  //   "likes": [],
  //   "_id": "5d1f0611d321eb4bdcd707dd",
  //   "name": "Байкал",
  //   "link": "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  //   "owner": {
  //     "name": "Jacques Cousteau",
  //     "about": "Sailor, researcher",
  //     "avatar": "https://pictures.s3.yandex.net/frontend-developer/ava.jpg",
  //     "_id": "ef5f7423f7f5e22bef4ad607",
  //     "cohort": "local"
  //   },
  //   "createdAt": "2019-07-05T08:10:57.741Z"
  // },

  createCardApi({ name, link }) {
    return fetch(this._baseUrl + '/cards', {
      headers: this._headers,
      method: 'POST',
      body: JSON.stringify({ name, link })
    })
    .then(this._checkServerResponse)
  }

  // Удалить карточку
  // DELETE 'https://mesto.nomoreparties.co/v1/cohort-61/cards/5d1f0611d321eb4bdcd707dd'
  deleteCard(cardId) {
    return fetch(this._baseUrl + `/cards/${cardId}`, {
      headers: this._headers,
      method: 'DELETE',
    })
    .then(this._checkServerResponse)
  }

    // Поставить лайк
  // PUT 'https://mesto.nomoreparties.co/v1/cohort-61/cards/cardId/likes'
  putCardLike(cardId) {
    return fetch(this._baseUrl + `/cards/likes/${cardId}`, {
      headers: this._headers,
      method: 'PUT',
    })
    .then(this._checkServerResponse)
  }

  // Убрать лайк
  // DELETE 'https://mesto.nomoreparties.co/v1/cohort-61/cards/cardId/likes'
  deleteCardLike(cardId) {
    return fetch(this._baseUrl + `/cards/likes/${cardId}`, {
      headers: this._headers,
      method: 'DELETE',
    })
    .then(this._checkServerResponse)
  }

  // Отправить новую информацию о профиле
  // PATCH 'https://mesto.nomoreparties.co/v1/cohort-61/users/me'
  setUserInfo({name, about}) {
    return fetch(this._baseUrl + '/users/me', {
      headers: this._headers,
      method: 'PATCH',
      body: JSON.stringify({
        name, about
      })
    })
    .then(this._checkServerResponse)
  }
  // Поменять фото
  // PATCH 'https://mesto.nomoreparties.co/v1/cohort-61/users/me/avatar'
  setUserAvatar({avatar}) {
    return fetch(this._baseUrl + `/users/me/avatar`, {
      headers: this._headers,
      method: 'PATCH',
      body: JSON.stringify({avatar})
    })
    .then(this._checkServerResponse)
  }
}

// export default class API {
//   constructor(config) {
//     this._baseUrl = config.baseUrl
//     this._headers = config.headers
//   }

//   // Запрос на сервер
//   _checkServerResponse(res) {
//     if (res.ok) {
//       return res.json();
//     } else {
//       return Promise.reject(`Код ошибки: ${res.status}`);
//     }
//   }

//   // Получить информацию о профиле
//   // GET 'https://nomoreparties.co/v1/cohort-61/users/me'
//   async getUserInfo() {
//     const response = await fetch(this._baseUrl + '/users/me', {
//       headers: this._headers,
//       method: 'GET',
//     });
//     const data = await.response.json()
//   }

//   // Отправить новую информацию о профиле
//   // PATCH 'https://mesto.nomoreparties.co/v1/cohort-61/users/me'
//   async sendUserInfo(userInfo) {
//     const response = await fetch(this._baseUrl + '/users/me', {
//       headers: this._headers,
//       method: 'GET',
//       body: JSON.stringify({
//         name: userInfo.name,
//         about: userInfo.about })
//     });
//     const data = await.response.json()
//   }

//   // Поменять фото
//   // PATCH 'https://mesto.nomoreparties.co/v1/cohortId/users/me/avatar'
//   async sendAvatar(avatarLink) {
//     const response = await fetch(this._baseUrl + `/users/me/avatar`, {
//       headers: this._headers,
//       method: 'PATCH',
//       body: JSON.stringify({ avatar: avatarLink.avatar })
//     });
//     const data = await.response.json()
//   }

//   // Получить карточки с сервера
//   // GET 'https://mesto.nomoreparties.co/v1/cohort-61/cards'
//   async getInitialCards() {
//     const response = await fetch(this._baseUrl + '/cards', {
//       headers: this._headers,
//       method: 'GET',
//     });
//     const data = await.response.json()
//   }

//   // Добавление карточек
//   // POST 'https://mesto.nomoreparties.co/v1/cohort-61/cards'
//   async addNewCard({ name, link }) {
//     const response = await fetch(this._baseUrl + '/cards', {
//       headers: this._headers,
//       method: 'POST',
//       body: JSON.stringify({ name, link })
//     });
//     const data = await.response.json()
//   }
//   // Удалить карточку
//   // DELETE 'https://mesto.nomoreparties.co/v1/cohortId/cards/5d1f0611d321eb4bdcd707dd'
//     // {
//   //   "likes": [],
//   //   "_id": "5d1f0611d321eb4bdcd707dd"
//   // }
//   async deleteCard(cardId) {
//     const response = await fetch(this._baseUrl + `/cards/${cardId}`, {
//       headers: this._headers,
//       method: 'DELETE',
//     });
//     const data = await.response.json()
//   }
//     // Поставить лайк
//   // PUT 'https://mesto.nomoreparties.co/v1/cohortId/cards/cardId/likes'
//   async putLike(cardId) {
//     const response = await fetch(this._baseUrl + `/cards/likes/${cardId}`, {
//       headers: this._headers,
//       method: 'PUT',
//     });
//     const data = await.response.json()
//   }
//   // Убрать лайк
//   // DELETE 'https://mesto.nomoreparties.co/v1/cohortId/cards/cardId/likes'
//  async deleteLike(cardId) {
//     const response = await fetch(this._baseUrl + `/cards/likes/${cardId}`, {
//       headers: this._headers,
//       method: 'DELETE',
//     });
//     const data = await.response.json()
//   }
// }
