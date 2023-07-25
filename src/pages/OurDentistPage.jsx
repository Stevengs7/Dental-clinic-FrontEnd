import React, { useEffect, useState } from "react";
import userService from "../_services/userService";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
  Stack,
} from "@mui/material";

// @mui

// ------------------------------------------------------------------------------------------------

export default function OurDentistPage() {
  const [dentist, setDentist] = useState([]);
  const [usersPage, setUsersPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const token = useSelector((state) => state.auth.token);
  const userId = useSelector((state) => state.auth.userInfo.id);
  const navigate = useNavigate();

  useEffect(() => {
    getDentist();
  }, []);

  const getDentist = async () => {
    setIsLoading(true);
    try {
      const data = await userService.getAllDentists(token, usersPage);
      setDentist(data.results.dentists);
      console.log(data.results.dentists);
      console.log(userId);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  //------------------------------- HANLDE----------------------------------------

  const handleCreateAppointment = async (value) => {
    navigate("/create-appointment");
    console.log(value);
  };

  return (
    <>
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography
            variant="h2"
            sx={{ mt: 10 }}
            fontWeight={500}
            gutterBottom
          >
            Our professionals
          </Typography>
        </Stack>
        <Typography variant="h6" fontWeight={300} gutterBottom>
          Our dental professionals are highly skilled and experienced experts in
          the field of dentistry. They are dedicated to providing exceptional
          oral care and ensuring the well-being of our patients' dental health.
          With a deep understanding of the latest advancements in dental
          techniques and technologies, our team stays up-to-date with continuous
          education and training to deliver the best possible dental services.
          Whether it's routine check-ups, advanced treatments, or cosmetic
          procedures, our dental professionals approach each case with
          precision, empathy, and a commitment to delivering outstanding
          results. Trustworthy, compassionate, and proficient, our dental team
          strives to create a comfortable and friendly environment for our
          patients, making their dental experience as pleasant as possible.
        </Typography>

        <Stack
          mb={5}
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        ></Stack>
        <Grid container spacing={3}>
          {dentist.map((dent) => (
            <Card key={dent.id} sx={{ maxWidth: 500, m: 2 }}>
              <CardMedia
                component="img"
                alt="avatar"
                height="350"
                image={`/assets/avatars/avatar_${dent.id_user}.jpg`}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {dent.user.user_name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {dent.specialization.specialization_name}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  alignItems="right"
                  variant="outlined"
                  size="small"
                  onClick={() => {
                    handleCreateAppointment(dent.id_user);
                  }}
                >
                  Create Appointment
                </Button>
              </CardActions>
            </Card>
          ))}
        </Grid>
      </Container>
    </>
  );
}
