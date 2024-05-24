import axios from "../../api/axios";
import { RoutesURLRoot } from "../../contants";

export const PostTrazas = async (action = "", id = "", user = {}) => {
  const rowlog = {
    estado: action === "insert" ? "Creado" : "Editado",
    registrosOpciId: id,
    UnidadId: user.idUnidad,
    UsuarioId: user.idUsuario,
  };

  return await axios.post(RoutesURLRoot.TRAZASOPCI, rowlog);
};
