import { Box, Typography } from "@mui/material";

export default function Titles({ title = "", subtitle = "" }) {
  return (
    <>
      <Box m={2} >
        <Typography variant="h2" fontWeight="bold">{title}</Typography>
        <Typography variant="h5">{subtitle}</Typography>
      </Box>
    </>
  );
}
