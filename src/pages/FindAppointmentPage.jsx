import {
  Box,
  Grid,
  Stack,
  Table,
  TableBody,
  Paper,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import userService from "../_services/userService";

export default function FindAppointmentPage() {
  const token = useSelector((state) => state.auth.token);
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
      const data = await userService.appointmentById(token, id);
      console.log(data);
      setAppointment(data);
      console.log(appointment);
    } catch (error) {
      console.log(error.response.data.message);
    } finally {
      setisLoading(false);
    }
  };

  /*   {
    "id": 45,
    "id_dentist": 2,
    "id_patient": 16,
    "date": "2023-11-12",
    "time": "08:30:00",
    "dentist": {
        "id_specialization": 2,
        "user": {
            "user_name": "jane",
            "user_last_name": "doe",
            "email": "jane@doe.com",
            "phone_number": "+34 678763802"
        },
        "specialization": {
            "id": 2,
            "specialization_name": "Periodontics"
        }
    }
} */

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

      {/*  */}

      {!isLoading && (
        <TableContainer component={Paper} sx={{ mb: 10 }}>
          <Table sx={{ minWidth: 600 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">ID</TableCell>
                <TableCell align="left">Dentist</TableCell>
                <TableCell align="left">Specialization</TableCell>
                <TableCell align="left">Date</TableCell>
                <TableCell align="left">Time</TableCell>
                <TableCell align="left">Email</TableCell>
                <TableCell align="left">Phone</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {appointment.id}
                </TableCell>
                <TableCell align="left">
                  {appointment.dentist.user.user_name}{" "}
                  {appointment.dentist.user.user_last_name}
                </TableCell>
                <TableCell align="left">
                  {appointment.dentist.specialization.specialization_name}
                </TableCell>
                <TableCell align="left">{appointment.date}</TableCell>
                <TableCell align="left">{appointment.time} h</TableCell>
                <TableCell align="left">
                  {appointment.dentist.user.email}
                </TableCell>
                <TableCell align="left">
                  {appointment.dentist.user.phone_number}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
}
