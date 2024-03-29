import { RoutesURLRoot } from "../../contants";
import { api } from "../../services";

export const PostTrazas = async (action = "", id = "", user = {}) => {
  const rowlog = {
    estado: action === "insert" ? "Creado" : "Editado",
    registrosOpciId: id,
    UnidadId: user.idUnidad,
    UsuarioId: user.idUsuario,
  };

  return await api.post(RoutesURLRoot.TRAZASOPCI, rowlog);
};
