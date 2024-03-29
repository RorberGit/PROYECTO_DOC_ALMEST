import api from "../services/axios.service";

const login = async (usuario, password) => {
  const response = await api({
    method: "post",
    url: "/auth/login",
    data: {
      usuario: usuario,
      password: password,
    },
  })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error?.response?.data;
    });

  return response;
};

const AuthService = {
  login,
};

export default AuthService;
