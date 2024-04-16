import * as yup from "yup";
import { useFormik } from "formik";
import FormHead from "../components/FormHead";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../redux/userSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const INITIAL_FORM_STATE = {
    email: "",
    password: "",
  };

  const validationSchema = yup.object({
    email: yup
      .string()
      .email("Invalid email address")
      .required("Email is required"),
    password: yup.string().required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      ...INITIAL_FORM_STATE,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const users = JSON.parse(localStorage.getItem("users")) || [];
      const validUser = users.find(
        (user) =>
          user.email === values.email && user.password === values.password
      );
      if (validUser) {
        toast.success("Logged in Successfully!");
        dispatch(login(validUser));
        navigate("/home");
      } else {
        toast.error("Invalid email or password");
        return;
      }
    },
  });

  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(to bottom,  #15edaf 10%,#0fd9db 90%)",
      }}
    >
      <Stack
        p={2}
        boxShadow={1}
        bgcolor="white"
        sx={{
          width: "500px",
          borderRadius: "12px",
        }}
      >
        <FormHead text="Login" />
        <Stack
          mt={3}
          spacing={2}
          component="form"
          onSubmit={formik.handleSubmit}
        >
          <TextField
            id="email"
            name="email"
            type="email"
            label="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            helperText={formik.touched.email && formik.errors.email}
            error={formik.touched.email && Boolean(formik.errors.email)}
          />
          <TextField
            id="password"
            name="password"
            type="password"
            value={formik.values.password}
            label="Password"
            onChange={formik.handleChange}
            helperText={formik.touched.password && formik.errors.password}
            error={formik.errors.password && Boolean(formik.errors.password)}
          />
          <Typography
            color="info.main"
            fontWeight={500}
            onClick={() => navigate("/signup")}
            sx={{
              cursor: "pointer",
              textAlign: "end",
              fontSize: "12px",
              lineHeight: "18px",
            }}
          >
            Create a New Account
          </Typography>
          <Button type="submit" variant="contained">
            Login
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};

export default Login;
