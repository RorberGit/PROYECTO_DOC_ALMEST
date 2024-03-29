import { TextField } from "@mui/material";
import PropTypes from "prop-types";

export default function CampoTexto(props) {
  const {
    name,
    label,
    value,
    handleBlur,
    handleChange,
    touched,
    errors,
    ncol,
    multiline,
    rows,
  } = props;

  return (
    <>
      <TextField
        name={name}
        size="small"
        variant="outlined"
        label={label}
        value={value}
        onBlur={handleBlur}
        onChange={handleChange}
        error={!!touched && !!errors}
        helperText={touched && errors}
        sx={ncol ? { gridColumn: `span ${ncol}` } : null}
        multiline={multiline ? multiline : false}
        rows={rows ? rows : 1}
      />
    </>
  );
}

CampoTexto.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string,
  handleBlur: PropTypes.func,
  handleChange: PropTypes.func,
  touched: PropTypes.bool,
  errors: PropTypes.string,
  ncol: PropTypes.string,
  multiline: PropTypes.bool,
  rows: PropTypes.number,
};
