import { Autocomplete, TextField } from "@mui/material";
import PropTypes from "prop-types";

export default function AutoCompletar(props) {
  const {
    options,
    label,
    value,
    setFieldValue,
    field,
    handleBlur,
    touched,
    errors,
    ncol,
    multiple,
  } = props;

  return (
    <>
      <Autocomplete
        multiple={multiple || false}
        disablePortal
        options={options}
        getOptionLabel={(option) => option.nombre}
        isOptionEqualToValue={(option, value) =>
          value === undefined || value === "" || option.id === value.id
        }
        value={value}
        defaultValue={value}
        onChange={(event, value) => setFieldValue(`${field}`, value)}
        size="small"
        sx={ncol ? { gridColumn: `span ${ncol}` } : {}}
        renderInput={(params) => (
          <TextField
            {...params}
            label={label}
            onBlur={handleBlur}
            error={!!touched && !!errors}
            helperText={touched && errors}
          />
        )}
      />
    </>
  );
}

AutoCompletar.propTypes = {
  options: PropTypes.array,
  name: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  setFieldValue: PropTypes.func,
  field: PropTypes.string,
  handleBlur: PropTypes.func,
  touched: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
    PropTypes.array,
  ]),
  errors: PropTypes.string,
  ncol: PropTypes.string,
  multiple: PropTypes.bool,
};
