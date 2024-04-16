import { toast } from "react-toastify";
import NavBar from "../components/NavBar";
import Loader from "../components/Loader";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { addToCart } from "../redux/cartSlice";
import { getProductById } from "../redux/productSlice";
import { useDispatch, useSelector } from "react-redux";
import RatingAndReview from "../components/RatingAndReview";
import ProductQuantity from "../components/ProductQuantity";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Box, Button, Card, Stack, Typography } from "@mui/material";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";

const Product = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const { currentProduct, error, isLoading } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    dispatch(getProductById(params.id));
  }, [dispatch, params.id]);

  const handleAddToCart = () => {
    const isAlreadyAdded = cartItems.find(
      (item) => item.id === currentProduct.id
    );
    if (isAlreadyAdded) {
      toast.info(
        "This item is already in cart. Please go to cart & update it."
      );
      return;
    }

    dispatch(
      addToCart({
        ...currentProduct,
        quantity,
      })
    );
    toast.success(`${currentProduct?.title} is added to cart!`);
  };

  if (error) return <></>;

  return (
    <>
      <NavBar />
      {isLoading ? (
        <Loader />
      ) : (
        <Stack
          px={3}
          py={5}
          spacing={12}
          direction={{ xs: "column", md: "row" }}
          justifyContent="center"
        >
          <Card
            style={{
              maxWidth: 400,
              alignSelf: "flex-start",
            }}
          >
            <img
              src={currentProduct?.image}
              alt={currentProduct?.title}
              style={{ objectFit: "cover", width: 260 }}
            />
          </Card>
          <Box sx={{ maxWidth: { xs: "100%", md: "600px" } }}>
            <Typography
              variant="h5"
              mb={1}
              color="primary.dark"
              sx={{ fontWeight: 500 }}
            >
              {currentProduct?.title}
            </Typography>
            <Stack
              mb={1.2}
              spacing={0.1}
              direction="row"
              alignItems="center"
              sx={{ fontWeight: 500 }}
            >
              <Typography variant="body1" color="primary.light">
                Category
              </Typography>
              <ChevronRightIcon sx={{ color: "primary.light", fontSize: 18 }} />
              <Typography variant="body1" color="highlight.light">
                {currentProduct?.category}
              </Typography>
            </Stack>
            <Stack
              mb={3}
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <RatingAndReview product={currentProduct} />
              <Stack
                mb={1.2}
                spacing={1}
                direction="row"
                alignItems="center"
                sx={{ fontWeight: 500 }}
              >
                <Typography variant="body1" color="primary.light">
                  Price :
                </Typography>

                <Typography variant="body1" color="highlight.main">
                  {`$${currentProduct?.price}`}
                </Typography>
              </Stack>
            </Stack>
            <Typography
              mb={1}
              variant="h6"
              color="primary.dark"
              sx={{ fontWeight: 500 }}
            >
              Description
            </Typography>
            <Typography mb={3} variant="body1" color="primary.main">
              {currentProduct?.description}
            </Typography>
            <ProductQuantity quantity={quantity} setQuantity={setQuantity} />
            <Button
              fullWidth
              variant="contained"
              onClick={handleAddToCart}
              endIcon={<ShoppingCartOutlinedIcon />}
              sx={{ marginTop: 6, backgroundColor: "highlight.main" }}
            >
              Add to Cart
            </Button>
          </Box>
        </Stack>
      )}
    </>
  );
};

export default Product;
