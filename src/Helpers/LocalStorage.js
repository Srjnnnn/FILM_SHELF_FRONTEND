export const setToLocalStorage = (sessionKey, email) => {
  localStorage.setItem(
    "filmShelfSessionKey",
    JSON.stringify({
      sessionKey,
      email
    })
  );
};

export const getFromLocalStorage = (theKey) => {
  return JSON.parse(localStorage.getItem(theKey))
}