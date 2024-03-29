import PropTypes from 'prop-types';
import { Box, Typography } from "@mui/material";

export default function Titles(props) {
  const {title, subtitle} = props
  return (
    <>
      <Box m={2} >
        <Typography variant="h2" fontWeight="bold">{title}</Typography>
        <Typography variant="h5">{subtitle}</Typography>
      </Box>
    </>
  );
}

Titles.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
};
