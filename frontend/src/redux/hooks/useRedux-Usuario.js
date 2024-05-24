import { useDispatch, useSelector } from "react-redux";
import { createUser, resetUser, updateUser } from "../states/userSlice";
import { useMemo } from "react";

export const useReduxUsuario = () => {
  const dispatch = useDispatch();

  const list = useSelector((state) => state.user);

  const action = useMemo(
    () => ({
      list: list,
      create: (body = {}) => dispatch(createUser(body)),
      update: (body = {}) => dispatch(updateUser(body)),
      reset: () => dispatch(resetUser()),
    }),
    [dispatch, list]
  );

  return action;
};
