export const persistLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify({ ...value }));
};

export const clearLocalStorage = (key) => {
  localStorage.removeItem(key);
};

export const getLocalStorage = (key) => {
  return JSON.parse(localStorage.getItem(key));
};

export const getToken = (key) => {
  const result = JSON.parse(localStorage.getItem(key));
  return result?.accessToken
};