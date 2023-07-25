import { Container } from "@mui/system";
import React, { useEffect, useState } from "react";
import dentistService from "../_services/dentistService";
import { useSelector } from "react-redux";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import {
  Box,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import "./ProfilePage.scss";

//------------------------------------ICONS---------------------------------------------------------

import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import CakeRoundedIcon from "@mui/icons-material/CakeRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import CreateRoundedIcon from "@mui/icons-material/CreateRounded";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import { format } from "date-fns";
import { red } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";
//---------------------------------------------------------------------------------------------

export default function ProfileDentistPage() {
  // ----------------------------- hooks -----------------------------------------

  const token = useSelector((state) => state.auth.token);
  const [profile, setProfile] = useState({});
  const [appointments, setAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    getProfile();
    getMyAppointments();
  }, []);

  const getProfile = async () => {
    try {
      const data = await dentistService.getMyProfile(token);
      setProfile(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const getMyAppointments = async () => {
    try {
      const data = await dentistService.getMyAppointments(token);
      setAppointments(data.results.appointments);
      console.log(data.results.appointments);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  //handle --------------------------------------------------------------------------------------------------

  // appointment delete
  const handleDelteAppointment = async (value) => {
    try {
      const id = { id: value };
      await dentistService.deleteAppointment(token, id);
      const data = await dentistService.getMyAppointments(token);
      setAppointments(data.results.appointments);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  // Edit profile
  const handleEditProfile = async (profile) => {
    profile, navigate("/profile-edit");
  };

  // ---------------------------------- return ----------------------------------------------------

  return (
    <>
      {!isLoading ? (
        <Container sx={{ mt: 5 }}>
          <React.Fragment>
            <Grid item xs={12} md={6}>
              <Box className={"user-info"}>
                <Box
                  className={"cabecera"}
                  style={{
                    backgroundImage: `url(../../assets/covers/cover_${profile.id}.jpg)`,
                  }}
                >
                  <Box
                    className={"profile-image"}
                    style={{
                      backgroundImage: `url(../../assets/avatars/avatar_${profile.id}.jpg)`,
                    }}
                  ></Box>
                </Box>
                <Box sx={{ pl: 3, pt: 10 }}>
                  <List>
                    <ListItem>
                      <Typography sm={{ mt: 5 }} component={"h2"} variant="h4">
                        {`${profile.user_name} ${profile.user_last_name}`}
                      </Typography>
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <EmailRoundedIcon />
                      </ListItemIcon>
                      <ListItemText primary={profile.email} />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <CakeRoundedIcon />
                      </ListItemIcon>
                      <ListItemText
                        primary={format(
                          new Date(profile?.birthday),
                          "yyyy-MM-dd"
                        )}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <PersonRoundedIcon />
                      </ListItemIcon>
                      <ListItemText primary={profile?.role.role} />
                    </ListItem>
                  </List>
                </Box>
                <Box className={"edit-button"}>
                  <Button
                    variant="contained"
                    size="small"
                    startIcon={<CreateRoundedIcon />}
                    onClick={() => handleEditProfile(profile)}
                  >
                    Edit
                  </Button>
                </Box>
              </Box>
            </Grid>
          </React.Fragment>
          {/* tabla appointments*/}
          <Typography sx={{ mt: 5 }} component={"h5"} variant="h5" gutterBottom>
            My appointments
          </Typography>
          <TableContainer component={Paper} sx={{ mb: 10 }}>
            <Table sx={{ minWidth: 600 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="left">ID</TableCell>
                  <TableCell align="left">Patient</TableCell>
                  <TableCell align="left">Date</TableCell>
                  <TableCell align="left">Time</TableCell>
                  <TableCell align="left">Email</TableCell>
                  <TableCell align="left">Phone</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {appointments.map((u) => (
                  <TableRow
                    key={u.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {u.id}
                    </TableCell>
                    <TableCell align="left">
                      {u.patient.user.user_name} {u.patient.user.user_last_name}
                    </TableCell>
                    <TableCell align="left">{u.date}</TableCell>
                    <TableCell align="left">{u.time}h</TableCell>
                    <TableCell align="left">{u.patient.user.email}</TableCell>
                    <TableCell align="left">
                      {u.patient.user.phone_number}
                    </TableCell>
                    <TableCell align="left">
                      <Button style={{ Align: "center", color: red }}>
                        <DeleteForeverRoundedIcon
                          sx={{ color: "red" }}
                          onClick={() => handleDelteAppointment(u.id)}
                        />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
      ) : (
        <Typography>Loading...</Typography>
      )}
    </>
  );
}
