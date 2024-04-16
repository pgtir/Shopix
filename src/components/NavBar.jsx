import Logo from "./Logo";
import { useState } from "react";
import CartDrawer from "./CartDrawer";
import { logout } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Badge,
  Button,
  Stack,
  Toolbar,
  IconButton,
  Box,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { clearCart } from "../redux/cartSlice";

const NavBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isCartOpen, setCartOpen] = useState(false);
  const cartItems = useSelector((state) => state.cart.cartItems);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearCart());
    navigate("/signup");
  };

  const handleToggleCart = () => {
    setCartOpen(!isCartOpen);
  };

  return (
    <AppBar position="sticky" sx={{ background: "#fafafa" }}>
      <Toolbar sx={{ justifyContent: "space-between", width: "92vw", margin: "0 auto" }}>
        <Logo />
        <Stack direction="row" spacing={3} sx={{ alignItems: "center" }}>
          <IconButton onClick={handleToggleCart}>
            <Badge badgeContent={cartItems?.length} color="primary">
              <ShoppingCartOutlinedIcon
                sx={{ color: "highlight.main", fontSize: 30 }}
              />
            </Badge>
          </IconButton>
          <Button onClick={handleLogout} variant="outlined">
            Logout
          </Button>
        </Stack>
      </Toolbar>
      <CartDrawer isOpen={isCartOpen} onClose={handleToggleCart} />
    </AppBar>
  );
};

export default NavBar;
