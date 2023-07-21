import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

// @MUI
import { Box, Container, Pagination, Typography } from "@mui/material";
import adminService from "../_services/adminService";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import PeopleAltRoundedIcon from "@mui/icons-material/PeopleAltRounded";

// ----------------------------------------------------------------------

export default function AdminPage() {
  // hooks
  const [users, setUsers] = useState([]);
  const [usersPage, setUsersPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [count, setCount] = useState(0);
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    handleGetUsers();
  }, [usersPage]);

  const handleChange = (event, value) => {
    setUsersPage(value);
  };

  //All users
  const handleGetUsers = () => {
    const getUsers = async () => {
      setIsLoading(true);
      try {
        const data = await adminService.getAll(token, usersPage);
        setUsers(data.results.users);
        setCount(data.info.pages);
        console.log(data.results);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
  };

  // Patients
  const handleGetPatients = () => {
    const getPatients = async () => {
      setIsLoading(true);
      try {
        const data = await adminService.getPatient(token, usersPage);
        setUsers(data.results);
        // setCount(data.info.pages);
        console.log(data.results);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
  };

  //Dentist
  const handleGetDentist = () => {
    const getDentist = async () => {
      setIsLoading(true);
      try {
        const data = await adminService.getDentist(token, usersPage);
        setUsers(data.results);
        console.log(data.results);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
  };

  return (
    <>
      <Container sx={{ mt: 5 }}>
        <Typography
          variant="h1"
          fontSize={40}
          align="center"
          fontWeight={400}
          gutterBottom
        >
          Admin panel
        </Typography>
        <Box>
          <Button
            variant="contained"
            startIcon={<PeopleAltRoundedIcon />}
            color="success"
            sx={{
              m: 2,
              color: "white",
            }}
            onClick={handleGetUsers()}
          >
            Users
          </Button>
          <Button
            variant="contained"
            startIcon={<PeopleAltRoundedIcon />}
            color="success"
            sx={{
              m: 2,
              color: "white",
            }}
            onClick={handleGetDentist()}
          >
            Dentist
          </Button>
          <Button
            variant="contained"
            startIcon={<PeopleAltRoundedIcon />}
            color="success"
            sx={{
              m: 2,
              color: "white",
            }}
            onClick={handleGetPatients()}
          >
            Patients
          </Button>
        </Box>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 600 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">ID</TableCell>
                <TableCell align="left">Name</TableCell>
                <TableCell align="left">Last Name</TableCell>
                <TableCell align="left">Email</TableCell>
                <TableCell align="left">Role</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((u) => (
                <TableRow
                  key={u.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {u.id}
                  </TableCell>
                  <TableCell align="left">{u.user_name}</TableCell>
                  <TableCell align="left">{u.user_last_name}</TableCell>
                  <TableCell align="left">{u.email}</TableCell>
                  <TableCell align="left">{u.role.role}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box sx={{ mt: 3, mb: 4, display: "flex", justifyContent: "center" }}>
          <Pagination page={usersPage} count={count} onChange={handleChange} />
        </Box>
      </Container>
    </>
  );
}
