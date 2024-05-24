import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { RoutesURL } from "../../Configuration/Contants/Routes.contants";
import { useBase64 } from "../../hooks/useBase64";
import useAxiosToken from "./../../hooks/useAxiosToken";
import { useReduxUsuario } from "../../redux/hooks";
import { useFetch } from "../../hooks";

export default function Avatar() {
  const { id } = useParams();

  const [avatar, setAvatar] = useState(null);

  const axiosToken = useAxiosToken();

  const getBase64 = useBase64();

  const redux = useReduxUsuario();

  const { data } = useFetch(`${RoutesURL.USUARIOS}/${id}`);

  useEffect(() => setAvatar(data?.foto), [data?.foto]);

  const CreateAvatar = (event) => {
    getBase64(event.target.files[0]).then((response) => {
      setAvatar(response);
    });
  };

  const PostAvatar = () => {
    axiosToken
      .put(`${RoutesURL.USUARIOS}/${id}`, { foto: avatar })
      .then(() => {
        redux.update({ foto: avatar });
      })
      .catch((error) => console.error(error));
  };

  return (
    <Stack direction="row" spacing={2} margin={2}>
      <Card sx={{ maxWidth: 500 }}>
        <CardHeader title="Avatar de usuario" />
        <CardMedia
          component="img"
          height="400"
          width="200"
          image={avatar}
          alt="Avatar"
        />
        <CardContent>
          <Typography variant="body2" color="text.secundary">
            Adjuntar archivos JPG o PNG, que no sobrepasen 1 mb.
          </Typography>{" "}
        </CardContent>
      </Card>

      <Stack spacing={2}>
        <TextField
          type="file"
          name="file"
          inputProps={{
            accept: "image/png, image/jpeg",
          }}
          onChange={CreateAvatar}
        />
        <Button
          variant="contained"
          disabled={!avatar}
          onClick={() => PostAvatar()}
          sx={{ width: "100px" }}
        >
          Aceptar
        </Button>
      </Stack>
    </Stack>
  );
}
