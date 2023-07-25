import { Box, Typography } from "@mui/material";
import "./HomePage.scss";
export default function HomePage() {
  return (
    <>
      <Box className="logo"></Box>
      <div className="home-box"></div>
      <Typography
        className="text-home"
        variant="h3"
        align="center"
        fontWeight={400}
        sx={{ color: "#1976d1" }}
      >
        Welcome!
      </Typography>
    </>
  );
}
