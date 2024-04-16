import { Stack, Typography } from "@mui/material";
import StarRateIcon from "@mui/icons-material/StarRate";

const RatingAndReview = ({ product }) => {
  return (
    <Stack
      direction="row"
      spacing={0.8}
      alignItems="center"
      sx={{ bgcolor: "#eeeeee", borderRadius: 1, px: 1.5, py: 0.5, maxWidth: "fit-content" }}
    >
      <Typography variant="body2" color="primary.main">
        {product?.rating?.rate}
      </Typography>
      <StarRateIcon sx={{ color: "warning.main", fontSize: 14 }} />
      <Typography color="primary">|</Typography>
      <Typography variant="body2" color="primary.main">
        {product?.rating?.count}
      </Typography>
    </Stack>
  );
};

export default RatingAndReview;
