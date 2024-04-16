import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Button,
  Card,
  Drawer,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CartItem from "./CartItem";
import { toast } from "react-toastify";
import { clearCart } from "../redux/cartSlice";

const CartDrawer = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const handleCheckout = () => {
    onClose();
    dispatch(clearCart());
    toast.success("Thank you for the purchase!");
  };
  return (
    <Drawer anchor="right" open={isOpen} onClose={onClose}>
      <IconButton sx={{ m: 2, mr: "auto" }} onClick={onClose}>
        <CloseIcon />
      </IconButton>
      <Typography variant="h6" sx={{ mx: 3, mt: 0, mb: 2, fontWeight: 500 }}>
        {cartItems?.length > 0
          ? `Your Cart (${cartItems?.length} items)`
          : "Your Cart is Empty. Try Adding new items!"}
      </Typography>
      {cartItems.map((item) => (
        <CartItem key={item.id} item={item} />
      ))}
      {cartItems?.length > 0 && (
        <Button
          variant="contained"
          onClick={handleCheckout}
          sx={{ mb: 4, mx: 4, backgroundColor: "highlight.light" }}
        >
          Proceed to Checkout
        </Button>
      )}
    </Drawer>
  );
};

export default CartDrawer;
