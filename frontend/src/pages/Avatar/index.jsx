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
import api from "../../services/axios.service";
import axios from "axios";
import { RoutesURLRoot } from "../../contants";

export default function Avatar() {
  const { id } = useParams();
  const [stateAceptar, setStateAceptar] = useState(true);
  const [avatarImg, setAvatarImg] = useState(null);
  const [ffile, setFfile] = useState(null);

  const getBase64 = (e) => {
    setStateAceptar(false);

    setFfile(() => e.target.files);
  };

  //poner avatar si esta presente el la base de datos
  useEffect(() => {
    const fetchCurrentAvatar = async () => {
      let ignore = false;
      try {
        const { data } = await api.get(`${RoutesURL.USERS}/${id}`);

        if (!ignore) {
          if (data.statusCode === 200) {
            if (data.data.avatarId) {
              setAvatarImg(
                `${RoutesURLRoot.APIURL}/avatar/${data.data.avatarId}`
              );
            }
          }
        }
      } catch (error) {
        console.log(error?.response?.data);
      } finally {
        ignore = true;
      }
    };

    fetchCurrentAvatar();
  }, [id]);

  //poner avatar si se carga en el input
  useEffect(() => {
    if (ffile) {
      let reader = new FileReader();
      reader.readAsDataURL(ffile[0]);
      reader.onload = () => {
        setAvatarImg(() => reader.result);
      };
      reader.onerror = function (error) {
        console.log("Error: ", error);
      };
    }
  }, [ffile]);

  const fetchUsuario = async () => {
    let ignore = false;
    try {
      if (!ignore) {
        let fileFormData = new FormData();
        fileFormData.append("file", ffile[0], ffile[0].name);

        await axios.post(
          `${RoutesURLRoot.APIURL}/users/avatar/${id}`,
          fileFormData,
          {
            Headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
      }
    } catch (error) {
      console.log(error?.response?.data);
    } finally {
      ignore = true;
      setStateAceptar(true);
    }
  };

  const AddAvatar = () => {
    fetchUsuario();
  };

  return (
    <Stack direction="row" spacing={2} margin={2}>
      <Card sx={{ maxWidth: 500 }}>
        <CardHeader title="Avatar de usuario" />
        <CardMedia
          component="img"
          height="400"
          width="200"
          image={avatarImg}
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
          onChange={getBase64}
        />
        <Button
          variant="contained"
          disabled={stateAceptar}
          onClick={() => AddAvatar()}
          sx={{ width: "100px" }}
        >
          Aceptar
        </Button>
      </Stack>
    </Stack>
  );
}
