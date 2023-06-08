class Api {
    constructor(options) {
        this._baseUrl = options.baseUrl;
    }

    _getResponseData(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`)
    }

    async getInitialCards() {
        const res = await fetch(`${this._baseUrl}/cards`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${localStorage.getItem('jwt')}`
            }
        });
        return this._getResponseData(res);
    }

    async getInformation() {
        const res = await fetch(`${this._baseUrl}/users/me`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${localStorage.getItem('jwt')}`
            }
        });
        return this._getResponseData(res);
    }

    async editUserInfo(data) {
        const res = await fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${localStorage.getItem('jwt')}`
            },
            body: JSON.stringify({
                name: data.name,
                about: data.about
            })
        });
        return this._getResponseData(res);
    }

    async addCard(data) {
        const res = await fetch(`${this._baseUrl}/cards`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${localStorage.getItem('jwt')}`
            },
            body: JSON.stringify(data),
        })
        return this._getResponseData(res)
    }

    async setLike(cardId) {
        const res = await fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${localStorage.getItem('jwt')}`
            },
        })
        return this._getResponseData(res)
    }

    async deleteLike(cardId) {
        const res = await fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${localStorage.getItem('jwt')}`
            },
        })
        return this._getResponseData(res)
    }

    async changeLikeCardStatus(cardId, isLiked) {
        const res = await fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
          method: isLiked ? 'PUT' : 'DELETE',
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem('jwt')}`
          },
        })
        return this._getResponseData(res)
      }

    async deleteCard(cardId) {
        const res = await fetch(`${this._baseUrl}/cards/${cardId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${localStorage.getItem('jwt')}`
            },
        })
        return this._getResponseData(res)
    }

    async editAvatar(data) {
        const res = await fetch(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${localStorage.getItem('jwt')}`
            },
            body: JSON.stringify({
                avatar: data
            })
        });
        return this._getResponseData(res);
    };
}

const api = new Api({
    baseUrl: 'https://api.mopsbox.students.nomoredomains.rocks',
})
export default api