import Logo from "./Logo";
import { Box, Typography } from "@mui/material";

const FormHead = ({ text }) => {
  return (
    <Box
      sx={{
        gap: "12px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography
        sx={{
          fontSize: "24px",
          fontWeight: "400",
          lineHeight: "30px",
          textAlign: "center",
          color: "primary.dark",
        }}
      >
        {`${text} to`}
      </Typography>
      <Logo />
    </Box>
  );
};

export default FormHead;
