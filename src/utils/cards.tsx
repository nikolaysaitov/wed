export const BASE_URL = 'http://localhost:3000';

export const getCards = () => {
  return fetch(`${BASE_URL}/catalog`, 
  {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('jwt')}`},
    })
    .then((response) => {
      return response.json();
    })
    .then((res) => {
      return res;
    })
    .catch((err) => console.log(err));
}

export const cardLike = (cardId: string, userId: string) => {
  return fetch(`${BASE_URL}/catalog`, 
  {
    method: 'PATCH',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('jwt')}`},
      body: JSON.stringify({cardId, userId})
    })
    .then((response) => {
      return response.json();
    })
    .then((res) => {
      return res;
    })
    .catch((err) => console.log(err));
}

export const cardDislike = (cardId: string, userId: string) => {
  return fetch(`${BASE_URL}/catalog`, 
  {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('jwt')}`},
      body: JSON.stringify({cardId, userId})
    })
    .then((response) => {
      return response.json();
    })
    .then((res) => {
      return res;
    })
    .catch((err) => console.log(err));
}


  