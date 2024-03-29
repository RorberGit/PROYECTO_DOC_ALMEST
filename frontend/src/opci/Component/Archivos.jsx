import PropTypes from "prop-types";

import { Remove } from "@mui/icons-material";
import {
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";

import { v4 as uuid } from "uuid";

export default function Archivos(props) {
  const { files, deleteFiles } = props;

  return (
    <div>
      {files.length ? (
        <Card>
          <CardHeader title="Archivos adjuntos"></CardHeader>
          <CardContent>
            {files.map((value) => (
              <Stack key={uuid()} spacing={2} direction="row">
                <Tooltip title="Eliminar">
                  <IconButton
                    aria-label="Remover"
                    onClick={() => deleteFiles(value.id)}
                  >
                    <Remove color="error" />
                  </IconButton>
                </Tooltip>
                <Typography>{value.name}</Typography>
              </Stack>
            ))}
          </CardContent>
        </Card>
      ) : null}
    </div>
  );
}

Archivos.propTypes = {
  files: PropTypes.array,
  deleteFiles: PropTypes.func,
};
