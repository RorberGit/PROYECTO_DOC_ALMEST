import { Box } from "@mui/material";
import { DatePicker, LocalizationProvider, esES } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import PropTypes from "prop-types";

export default function Fecha(props) {
  const { label, value, setFieldValue, field, touched, errors, ncol } = props;

  return (
    <Box sx={{ gridColumn: `span ${ncol}`, marginTop: "-8px" }}>
      {/*Campo Fecha*/}
      <LocalizationProvider
        dateAdapter={AdapterDayjs}
        adapterLocale="es"
        localeText={
          esES.components.MuiLocalizationProvider.defaultProps.localeText
        }
      >
        <DemoContainer components={["DatePicker"]}>
          <DatePicker
            label={label}
            value={value}
            views={["year", "month", "day"]}
            onChange={(newValue) => setFieldValue(`${field}`, newValue)}
            slotProps={{
              textField: {
                size: "small",
                helperText: touched && errors,
              },
            }}
          />
        </DemoContainer>
      </LocalizationProvider>
    </Box>
  );
}

Fecha.propTypes = {
  label: PropTypes.string,
  value: PropTypes.object,
  setFieldValue: PropTypes.func,
  field: PropTypes.string,
  touched: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  errors: PropTypes.string,
  ncol: PropTypes.string,
};
