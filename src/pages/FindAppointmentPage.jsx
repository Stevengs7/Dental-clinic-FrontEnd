import { Box, Button, Grid, Stack, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import userService from "../_services/userService";

export default function FindAppointmentPage() {
  const token = useSelector((state) => state.auth.token);
  const [idAppointment, setIdAppointment] = useState();
  const [appointment, setAppointment] = useState({});
  const [isLoading, setisLoading] = useState(true);
  const navigate = useNavigate();

  // ==================================== HANDLES =======================================

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      const appointmentId = +data.get("appointment");
      getMyAppointment(appointmentId);
    } catch (error) {
      console.log(error);
    }
  };

  const getMyAppointment = async (appointmentId) => {
    try {
      const id = { id: appointmentId };
      console.log(id);
      const myAppointment = await userService.appointmentById(token, id);
      setAppointment(myAppointment);
      console.log(myAppointment);
    } catch (error) {
      console.log(error);
    } finally {
      setisLoading(false);
    }
  };

  return (
    <div>
      <Box
        component="form"
        noValidate
        onSubmit={handleSubmit}
        sx={{
          backgroundColor: "white",
          m: 10,
          mt: 5,
          p: 4,
          borderRadius: 4,
          border: "1px solid #e8e8e8",
          boxShadow:
            "rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography variant="h5">Find Appointment</Typography>
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Stack
              fullWidth
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <TextField
                fullWidth
                name="appointment"
                id="outlined-basic"
                label="Search"
                variant="outlined"
              />
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
