import axios from "../api/axios";

const login = async (usuario, password) => {
  const response = await axios({
    method: "post",
    url: "/auth/login",
    data: {
      usuario: usuario,
      password: password,
    },
  })
    .then((response) => {
      console.info("usuario", response);
      return response.data;
    })
    .catch((error) => {
      console.error("usuario", error);
      return error?.response?.data;
    });

  return response;
};

const AuthService = {
  login,
};

export default AuthService;
