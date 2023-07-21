import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

// @MUI
import { DataGrid } from "@mui/x-data-grid";
import { Box, Container, Pagination, Typography } from "@mui/material";
import adminService from "../_services/adminService";
import Button from "@mui/material/Button";
import PeopleAltRoundedIcon from "@mui/icons-material/PeopleAltRounded";
import { FastForward } from "@mui/icons-material";

// ----------------------------------------------------------------------

export default function AdminPage() {
  // hooks
  const [users, setUsers] = useState([]);
  const [patients, setPatients] = useState([]);
  const [dentist, setDentist] = useState([]);
  const [usersPage, setUsersPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [count, setCount] = useState(0);
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    getUsers();
    getPatients();
    getDentist();
  }, [usersPage]);

  const handleChange = (event, value) => {
    setUsersPage(value);
  };

  //All users
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

  // Patients
  const getPatients = async () => {
    setIsLoading(true);
    try {
      const data = await adminService.getPatient(token, usersPage);
      setPatients(data.results);
      setCount(data.info.pages);
      console.log(data.results);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  //Dentist
  const getDentist = async () => {
    setIsLoading(true);
    try {
      const data = await adminService.getDentist(token, usersPage);
      setDentist(data.results);
      console.log(data.results);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const dataUsers = users.map((u) => ({
    id: u.id,
    firstName: u.user_name,
    lastName: u.user_last_name,
    email: u.email,
    role: u.role.role,
  }));

/*   const dataPatients = patients.map((p) => ({
    id: p.id,
    
  })); */

  const columns = [
    { field: "id", headerName: "ID", width: 130 },
    { field: "firstName", headerName: "First name", width: 130 },
    { field: "lastName", headerName: "Last name", width: 130 },
    { field: "email", headerName: "Email", width: 130 },
    { field: "role", headerName: "Role", width: 130 },
  ];

  const rows = dataUsers;

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
          >
            Users
          </Button>
        </Box>
        <div style={{ height: 400, width: "100%" }}>
          <DataGrid rows={rows} columns={columns} />
        </div>
        <Box sx={{ mt: 3, mb: 4, display: "flex", justifyContent: "center" }}>
          <Pagination page={usersPage} count={count} onChange={handleChange} />
        </Box>
      </Container>
    </>
  );
}
