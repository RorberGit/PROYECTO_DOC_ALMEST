import { enqueueSnackbar } from "notistack";

export const useShowMessage = () => {
  const Message = async (message, variant) => {
    setTimeout(
      () =>
        enqueueSnackbar(message, {
          variant: variant,
          preventDuplicate: true,
        }),
      100
    );
  };

  return [Message];
};
