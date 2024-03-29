const GetAccessToken = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user?.accessToken;
};

const SetAccessToken = (token) => {
  localStorage.setItem("token", JSON.stringify(token));
};

const GetUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const SetUser = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
};

const RemoveUser = () => {
  localStorage.removeItem("user");
};

const TokenService = {
  GetAccessToken,
  SetAccessToken,
  GetUser,
  SetUser,
  RemoveUser,
};

export default TokenService;
