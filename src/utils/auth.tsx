export const BASE_URL = 'http://localhost:3000';

export const checkUser = (formValue: {
  name: string;
  email: string;
  weddingDate: string;
  gender: string;
  password: string;
}) => {
  const email = formValue.email;
  const name = formValue.name;
  const weddingDate = formValue.weddingDate;
  const gender = formValue.gender;
  return fetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('jwt')}`
    },
    body: JSON.stringify({ email, name, weddingDate, gender })
  })
    .then((response) => {
      return response.json();
    })
    .then((res) => {
      return res;
    })
    .catch((err) => console.log(err));
};

export const login = (formValue: { email: string; password: string }) => {
  const email = formValue.email;
  const password = formValue.password;
  return fetch(`${BASE_URL}/login/auth`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('jwt')}`
    },
    body: JSON.stringify({ email, password })
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      if (data.token) {
        localStorage.setItem('jwt', data.token);
        return data;
      }
      console.log(data);
    })
    .catch((err) => console.log(err));
};

export const logout = () => {
  return fetch(`${BASE_URL}/profile/exit`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('jwt')}`
    }
  })
    .then((res) => {
      return res;
    })
    .catch((err) => console.log(err));
};

export const deleteAccount = (formValue: { email: string; password: string }) => {
  const email = formValue.email;
  const password = formValue.password;
  return fetch(`${BASE_URL}/profile/me`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('jwt')}`
    },
    body: JSON.stringify({ email, password })
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      if (data.token) {
        localStorage.setItem('jwt', data.token);
        return data;
      }
      console.log(data);
    })
    .catch((err) => console.log(err));
};
