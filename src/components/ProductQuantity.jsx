import {
  Box,
  Button,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import AddCircleIcon from "@mui/icons-material/AddCircle";

const ProductQuantity = ({ quantity, setQuantity }) => {
  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncrement = () => {
    if (quantity < 100) {
      setQuantity(quantity + 1);
    }
  };
  return (
    <Stack
      direction="row"
      spacing={2}
      alignItems="center"
      justifyContent="space-between"
    >
      <Typography variant="body1" color="primary.dark">
        Quantity :
      </Typography>
      <Stack direction="row" flex={1} spacing={2} alignItems="center">
        <IconButton onClick={handleDecrement}>
          <RemoveCircleIcon sx={{ color: "primary.light", fontSize: 34 }} />
        </IconButton>
        <TextField
          type="number"
          value={quantity}
          onChange={(e) => {
            const value = e.target.value;
            if (value >= 1 && value <= 100) {
              setQuantity(value);
            }
          }}
        />
        <IconButton onClick={handleIncrement}>
          <AddCircleIcon sx={{ color: "primary.light", fontSize: 34 }} />
        </IconButton>
      </Stack>
    </Stack>
  );
};

export default ProductQuantity;
