import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

// @MUI
import { DataGrid } from "@mui/x-data-grid";
import { Box, Container, Pagination, Typography } from "@mui/material";
import adminService from "../_services/adminService";
import Button from "@mui/material/Button";
import PeopleAltRoundedIcon from "@mui/icons-material/PeopleAltRounded";

// ----------------------------------------------------------------------

export default function AdminPage() {
  // hooks
  const token = useSelector((state) => state.auth.token);
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [patients, setPatients] = useState([]);
  const [dentists, setDentist] = useState([]);

  //------ pages --------------------------------------------------
  const [usersPage, setUsersPage] = useState(1);
  const [patientsPage, setPatientsPage] = useState(1);
  const [dentistsPage, setDentistsPage] = useState(1);
  //------ pages --------------------------------------------------
  const [userCount, setUsersCount] = useState(0);
  const [patientCount, setPatientCount] = useState(0);
  const [dentistCount, setDentistCount] = useState(0);

  useEffect(() => {
    getUsers();
    getPatients();
    getDentist();
  }, [usersPage, patientsPage, dentistsPage]);

  const handleChangeUsers = (event, value) => {
    setUsersPage(value);
  };

  const handleChangePatients = (event, value) => {
    setPatientsPage(value);
  };

  const handleChangeDentists = (event, value) => {
    setDentistsPage(value);
  };

  //All users
  const getUsers = async () => {
    setIsLoading(true);
    try {
      const data = await adminService.getAll(token, usersPage);
      setUsers(data.results.users);
      setUsersCount(data.info.pages);
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
      const data = await adminService.getPatient(token, patientsPage);
      setPatients(data.results.patients);
      setPatientCount(data.info.pages);
      console.log(data.results.patients);
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
      const data = await adminService.getDentist(token, dentistsPage);
      setDentist(data.results.dentists);
      setDentistsPage(data.info.pages);
      console.log(data.results.dentists);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  // Datos --------------------------------------------------------------------

  const columns = [
    { field: "id", headerName: "ID", width: 130 },
    { field: "firstName", headerName: "First name", width: 250 },
    { field: "lastName", headerName: "Last name", width: 250 },
    { field: "email", headerName: "Email", width: 250 },
    { field: "role", headerName: "Role", width: 250 },
  ];

  const dataUsers = users.map((u) => ({
    id: u.id,
    firstName: u.user_name,
    lastName: u.user_last_name,
    email: u.email,
    role: u.role.role,
  }));

  const dataDentists = dentists.map((d) => ({
    id: d.id,
    firstName: d.user.user_name,
    lastName: d.user.user_last_name,
    email: d.user.email,
  }));

  const dataPatients = patients.map((p) => ({
    id: p.id,
    firstName: p.user.user_name,
    lastName: p.user.user_last_name,
    email: p.user.email,
  }));

  const rows_users = dataUsers;
  const rows_patients = dataPatients;
  const rows_dentists = dataDentists;

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
          <DataGrid rows={rows_users} columns={columns} />
        </div>
        <Box sx={{ mt: 3, mb: 4, display: "flex", justifyContent: "center" }}>
          <Pagination
            page={usersPage}
            count={userCount}
            onChange={handleChangeUsers}
          />
        </Box>

        {/* Dentists */}

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
            Dentists
          </Button>
        </Box>
        <div style={{ height: 400, width: "100%" }}>
          <DataGrid rows={rows_dentists} columns={columns} />
        </div>
        <Box sx={{ mt: 3, mb: 4, display: "flex", justifyContent: "center" }}>
          <Pagination
            page={dentistsPage}
            count={dentistCount}
            onChange={handleChangeDentists}
          />
        </Box>

        {/* Patients */}

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
            Patients
          </Button>
        </Box>
        <div style={{ height: 400, width: "100%" }}>
          <DataGrid rows={rows_patients} columns={columns} />
        </div>
        <Box sx={{ mt: 3, mb: 4, display: "flex", justifyContent: "center" }}>
          <Pagination
            page={patientsPage}
            count={patientCount}
            onChange={handleChangePatients}
          />
        </Box>
      </Container>
    </>
  );
}
