import { createSlice } from "@reduxjs/toolkit";

export const EmptyUserState = {
  idUsuario: "",
  fullname: "",
  usuario: "",
  rol: "",
  idUnidad: "",
  keyUnidad: "",
  unidad: "",
  foto: "",
};

export const UserKey = "user";

export const userSlice = createSlice({
  name: "user",
  initialState: EmptyUserState,
  reducers: {
    createUser: (state, action) => {
      return action.payload;
    },
    updateUser: (state, action) => {
      const result = { ...state, ...action.payload };
      return result;
    },
    resetUser: () => {
      return EmptyUserState;
    },
  },
});

export const { createUser, updateUser, resetUser } = userSlice.actions;

export default userSlice.reducer;
