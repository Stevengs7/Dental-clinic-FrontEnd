import { Container } from "@mui/system";
import React, { useEffect, useState } from "react";
import userService from "../_services/userService";
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
//---------------------------------------------------------------------------------------------

export default function ProfilePage() {
  const token = useSelector((state) => state.auth.token);
  const [profile, setProfile] = useState({});
  const [appointments, setAppointments] = useState([]);
  const [isLoading, setisLoading] = useState(true);

  useEffect(() => {
    getProfile();
    getMyAppointments();
  }, []);

  const getProfile = async () => {
    try {
      const data = await userService.getMyProfile(token);
      setProfile(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    } finally {
      setisLoading(false);
    }
  };

  const getMyAppointments = async () => {
    try {
      const data = await userService.getMyAppointments(token);
      setAppointments(data.results.appointments);
      console.log(data.results.appointments);
    } catch (error) {
      console.log(error);
    } finally {
      setisLoading(false);
    }
  };

  // appointment delete
  const handleDelteAppointment = async (value) => {
    const id = { id: value };
    await userService.deleteAppointment(token, id);
    const data = await userService.getMyAppointments(token);
    setAppointments(data);
  };
  return (
    <>
      {!isLoading ? (
        <Container sx={{ mt: 5 }}>
          <React.Fragment>
            <Grid item xs={12} md={6}>
              <Box className={"user-info"}>
                <Box className={"cabecera"}>
                  <Box
                    className={"profile-image"}
                    style={{
                      backgroundImage: `url(../../avatars/avatar_${profile.id}.jpg)`,
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
                <Box style={{ mb: 10, textAlign: "right" }}>
                  <Button variant="contained">
                    <CreateRoundedIcon />
                    Edit Profile
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
                  <TableCell align="left">Dentist</TableCell>
                  <TableCell align="left">Specialization</TableCell>
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
                      {u.dentist.user.user_name} {u.dentist.user.user_last_name}
                    </TableCell>
                    <TableCell align="left">
                      {u.dentist.specialization.specialization_name}
                    </TableCell>
                    <TableCell align="left">{u.date}</TableCell>
                    <TableCell align="left">{u.time} h</TableCell>
                    <TableCell align="left">{u.dentist.user.email}</TableCell>
                    <TableCell align="left">
                      {u.dentist.user.phone_number}
                    </TableCell>
                    <TableCell align="left">
                      <Button style={{ Align: "center" }}>
                        <DeleteForeverRoundedIcon
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
