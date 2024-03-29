import { RoutesURLRoot } from "../../contants";
import { api } from "../../services";

const ObtenerConsecutivo = async () => {
  try {
    const response = await api.get(
      `${RoutesURLRoot.OPCI}/${RoutesURLRoot.CONSECUTIVO}`
    );

    return response.data;
  } catch (error) {
    console.error("Error en numero consecutivo:=>", error);
  }
};

export default ObtenerConsecutivo;
