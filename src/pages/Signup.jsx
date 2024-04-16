import * as yup from "yup";
import { useFormik } from "formik";
import FormHead from "../components/FormHead";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const INITIAL_FORM_STATE = {
    email: "",
    lastName: "",
    password: "",
    firstName: "",
  };

  const validationSchema = yup.object({
    email: yup
      .string()
      .email("Invalid email address")
      .required("Email is required"),
    firstName: yup
      .string()
      .min(2, "First name must be at least 2 characters")
      .required("First name is required"),
    lastName: yup
      .string()
      .min(2, "Last name must be at least 2 characters")
      .required("Last name is required"),
    password: yup
      .string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters")
      .max(16, "Password must be at most 16 characters")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,16}$/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
      ),
  });

  const formik = useFormik({
    initialValues: {
      ...INITIAL_FORM_STATE,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const users = JSON.parse(localStorage.getItem("users")) || [];
      const isEmailExisting = users.find((user) => user.email === values.email);

      if (isEmailExisting) {
        toast.error("This email already exists");
        return;
      }

      const newUserData = {
        email: values.email,
        lastName: values.lastName,
        password: values.password,
        firstName: values.firstName,
      };
      localStorage.setItem("users", JSON.stringify([...users, newUserData]));
      toast.success(
        "Signed Up Successfully. Please login with your credentials!"
      );
      navigate("/login");
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
        <FormHead text="Signup" />
        <Stack
          mt={3}
          spacing={2}
          component="form"
          onSubmit={formik.handleSubmit}
        >
          <TextField
            type="text"
            id="firstName"
            name="firstName"
            label="First Name"
            value={formik.values.firstName}
            onChange={formik.handleChange}
            helperText={formik.touched.firstName && formik.errors.firstName}
            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
          />
          <TextField
            type="text"
            id="lastName"
            name="lastName"
            label="Last Name"
            value={formik.values.lastName}
            onChange={formik.handleChange}
            helperText={formik.touched.lastName && formik.errors.lastName}
            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
          />
          <TextField
            id="email"
            name="email"
            type="email"
            label="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            helperText={formik.touched.email && formik.errors.email}
            error={formik.touched.password && Boolean(formik.errors.email)}
          />
          <TextField
            id="password"
            name="password"
            type="password"
            value={formik.values.password}
            label="Password"
            onChange={formik.handleChange}
            helperText={formik.touched.password && formik.errors.password}
            error={formik.touched.password && Boolean(formik.errors.password)}
          />
          <Typography
            color="info.main"
            fontWeight={500}
            onClick={() => navigate("/login")}
            sx={{
              cursor: "pointer",
              textAlign: "end",
              fontSize: "12px",
              lineHeight: "18px",
            }}
          >
            Login to your account
          </Typography>
          <Button type="submit" variant="contained">
            Sign up
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};

export default Signup;
