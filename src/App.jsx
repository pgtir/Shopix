import Home from "./pages/Home";
import Login from "./pages/Login";
import theme from "./utils/theme";
import Signup from "./pages/Signup";
import Product from "./pages/Product";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import { ThemeProvider } from "@mui/material";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import ProtectedRoutes from "./components/ProtectedRoutes";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route element={<ProtectedRoutes />}>
              <Route path="/home" element={<Home />} />
              <Route path="/product/:id" element={<Product />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
      <ToastContainer />
    </Provider>
  );
}

export default App;
