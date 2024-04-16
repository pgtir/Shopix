import ProductQuantity from "./ProductQuantity";
import { useEffect, useState } from "react";
import { Box, Button, Card, Stack, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { removeItemFromCart, updateQuantityInCart } from "../redux/cartSlice";
import { DeleteOutline } from "@mui/icons-material";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(item.quantity);

  useEffect(() => {
    dispatch(updateQuantityInCart({ id: item?.id, quantity }));
  }, [quantity]);

  const handleRemoveItem = () => {
    dispatch(removeItemFromCart(item?.id));
  };

  return (
    <Stack
      mb={2.4}
      spacing={2}
      sx={{ bgcolor: "#eeeeee", borderRadius: "12px", p: 2, mx: 4, maxWidth: 600 }}
    >
      <Stack spacing={2} direction="row">
        <Card sx={{flexShrink: 0, alignSelf: "flex-start"}}>
          <img src={item?.image} alt={item?.title} style={{ width: "150px" }} />
        </Card>
        <Box>
          <Typography mb={1} variant="h6">
            {item?.title}
          </Typography>
          <Stack
            mb={1.2}
            spacing={1}
            direction="row"
            alignItems="center"
            sx={{ fontWeight: 500 }}
          >
            <Typography variant="body2" color="primary.light">
              Price :
            </Typography>

            <Typography variant="body2" color="highlight.main">
              {`$${item?.price}`}
            </Typography>
          </Stack>
          <ProductQuantity quantity={quantity} setQuantity={setQuantity} />
          <Button
            color="error"
            sx={{ mt: 2 }}
            variant="outlined"
            onClick={handleRemoveItem}
            endIcon={<DeleteOutline />}
          >
            Remove Item
          </Button>
        </Box>
      </Stack>
    </Stack>
  );
};

export default CartItem;
