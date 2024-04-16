import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Logo = () => {
  const navigate = useNavigate();
  return (
    <Typography
      onClick={() => navigate("/home")}
      sx={{
        fontSize: "32px",
        cursor: "pointer",
        fontWeight: "700",
        lineHeight: "38px",
        textAlign: "center",
        fontFamily: `"Dancing Script", cursive`,
        background: "linear-gradient(to right, #15edaf , #0fd9db )",
        backgroundClip: " text",
        "-webkitBackgroundClip": "text",
        "-webkitTextFillColor": "transparent",
      }}
    >
      Shopix
    </Typography>
  );
};

export default Logo;
