import { Typography } from "@mui/material";
import { Container } from "@mui/system";
import "./HomePage.scss";
export default function HomePage() {
  return (
    <>
      <div className="home-box">
        <Container sx={{ mt: 5 }}>
          <div>
            <Typography>Home</Typography>
            <Typography>Welcome to Dentist Clinic</Typography>
          </div>
        </Container>
      </div>
    </>
  );
}
