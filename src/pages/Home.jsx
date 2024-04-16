import {
  Box,
  Card,
  Chip,
  Grid,
  Stack,
  Typography,
  CardContent,
} from "@mui/material";
import Loader from "../components/Loader";
import NavBar from "../components/NavBar";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import RatingAndReview from "../components/RatingAndReview";
import { getAllCategories, getAllProducts } from "../redux/productSlice";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [activeCategory, setActiveCategory] = useState("all products");
  const { isLoading, products, categories, error } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    dispatch(getAllProducts());
    dispatch(getAllCategories());
  }, [dispatch]);

  if (error) {
    return <></>;
  }

  const filteredProducts =
    activeCategory === "all products"
      ? products
      : products?.filter((product) => product.category === activeCategory);

  return (
    <>
      <NavBar />
      {isLoading ? (
        <Loader />
      ) : (
        <Box px={3} py={2} sx={{ bgcolor: "#eeeeee" }}>
          <Stack direction="row" spacing={2} mb={2} justifyContent="center">
            {["all products", ...categories]?.map((category) => {
              const isChipActive = activeCategory === category;
              return (
                <Chip
                  key={category}
                  label={category}
                  onClick={() => setActiveCategory(category)}
                  sx={{
                    color: isChipActive ? "white" : "primary.light",
                    bgcolor: isChipActive ? "highlight.main" : "white",
                    "&:focus, &:hover": {
                      color: isChipActive ? "white" : "primary.light",
                      bgcolor: isChipActive ? "highlight.main" : "white",
                    },
                  }}
                  variant={isChipActive ? "filled" : "outlined"}
                />
              );
            })}
          </Stack>
          <Grid container spacing={2} sx={{width: "92vw", maxWidth: "1500px", margin: "0 auto" }}>
            {filteredProducts?.map((product) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                <Card
                  onClick={() => navigate(`/product/${product.id}`)}
                  sx={{
                    p: 2,
                    height: "280px",
                    cursor: "pointer",
                    position: "relative",
                    "&:hover .overlay": {
                      opacity: 0.8,
                    },
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <img
                      src={product.image}
                      alt=""
                      style={{ height: "200px" }}
                    />
                  </Box>
                  <CardContent>
                    <Typography
                      variant="h6"
                      p={2}
                      pb={3}
                      className="overlay"
                      sx={{
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        color: "#fff",
                        opacity: 0,
                        position: "absolute",
                        transition: "opacity 0.3s ease",
                        display: "flex",
                        alignItems: "flex-end",
                        justifyContent: "center",
                        background:
                          "linear-gradient(180deg, #5EA9AC05 0%, #61AAAE 56%, #077a7f 100%)",
                      }}
                    >
                      {product.title}
                    </Typography>
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <RatingAndReview product={product} />
                      <Typography variant="body2" color="highlight.main">
                        ${product.price}
                      </Typography>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </>
  );
};

export default Home;
