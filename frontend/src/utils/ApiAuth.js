export const BASE_URL = 'https://api.mopsbox.students.nomoredomains.rocks';

function getResponseData(res) {
  if (res.ok) {
      return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`)
}

export const register = (email, password) => {
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
            "Content-Type": "application/json"
        },
        body: JSON.stringify({email, password}),
    })
    .then(response => {
      return getResponseData(response)
  }) 
}


export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({email, password})
  })
  .then(response => {
    return getResponseData(response)
  })
  
  .then((data) => {
    if (data.token){
      localStorage.setItem('jwt', data.token);
      return data;
    }
  })
};

export const getContent = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      "Authorization" : `Bearer ${localStorage.getItem('token')}`,
      "Content-Type": "application/json"
    }
  })
  .then(response => {
    return getResponseData(response)
  })
  .then(data => data)
} 