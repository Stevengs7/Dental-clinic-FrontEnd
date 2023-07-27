import React, { useEffect, useState } from "react";
import userService from "../_services/userService";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Box, Button, Grid, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

//----------------------------------------------------------------------------------------------------

import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateField } from "@mui/x-date-pickers/DateField";

//----------------------------------------------------------------------------------------------------

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

//----------------------------------------------------------------------------------------------------

const names = [
  {
    id_dentist: 1,
    name: "John Smith",
  },
  {
    id_dentist: 2,
    name: "Jane Doe",
  },
  {
    id_dentist: 3,
    name: "Alex Wilson",
  },
  {
    id_dentist: 4,
    name: "Sarah Jones",
  },
  {
    id_dentist: 5,
    name: "Michael Brown",
  },
];

const times = [
  "08:00",
  "08:30",
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "13:00",
  "13:30",
  "14:00",
];

function getNameStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

function getTimeStyles(time, personTime, theme) {
  return {
    fontWeight:
      personTime.indexOf(time) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

// =============================================================================

export default function CreateAppointment() {
  const token = useSelector((state) => state.auth.token);
  const userId = useSelector((state) => state.auth.userInfo.id);
  const [dentist, setDentist] = useState([]);
  const [usersPage, setUsersPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  //----------------------------------------------------------

  const theme = useTheme();
  const [personName, setPersonName] = React.useState([]);
  const [personTime, setPersonTime] = React.useState([]);
  const [value, setValue] = React.useState(dayjs(""));

  const handleNameChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const handleTimeChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonTime(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

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

  //--------------------Create Appointment -----------------------------

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const appointment = {
      id_dentist: data.get("dentist"),
      date: data.get("date"),
      time: data.get("time"),
    };
    createNewAppointment(appointment);
  };

  const createNewAppointment = async (appointment) => {
    try {
      const newAppointment = await userService.CreateAppointment(
        token,
        appointment
      );
      console.log(newAppointment);
      navigate("/profile");
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  return (
    <>
      <div>
        <Typography variant="h3" align="center" fontWeight={400} sx={{ m: 15 }}>
          Create a new appoinment with one of our professionals
        </Typography>
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
          {/* Dentist */}
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <FormControl fullWidth sx={{ m: 1 }}>
                <InputLabel id="demo-multiple-name-label">Dentist</InputLabel>
                <Select
                  fullWidth
                  labelId="demo-multiple-name-label"
                  id="demo-multiple-name"
                  name="dentist"
                  multiple
                  value={personName}
                  onChange={handleNameChange}
                  input={<OutlinedInput label="Name" />}
                  MenuProps={MenuProps}
                >
                  {names.map((name) => (
                    <MenuItem
                      key={name.id_dentist}
                      value={name.id_dentist}
                      style={getNameStyles(name, personName, theme)}
                    >
                      {name.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              {/* DATE PICKER */}
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DateField", "DateField"]}>
                  <DateField
                    fullWidth
                    label="Select the date"
                    name="date"
                    value={value}
                    onChange={(newValue) => setValue(newValue)}
                    format="YYYY-MM-DD"
                  />
                </DemoContainer>
              </LocalizationProvider>

              {/* time */}
              <FormControl fullWidth sx={{ m: 1 }}>
                <InputLabel id="demo-multiple-name-label">Time</InputLabel>
                <Select
                  fullWidth
                  labelId="demo-multiple-name-label"
                  id="demo-multiple-name"
                  name="time"
                  multiple
                  value={personTime}
                  onChange={handleTimeChange}
                  input={<OutlinedInput label="Time" />}
                  MenuProps={MenuProps}
                >
                  {times.map((time) => (
                    <MenuItem
                      key={time}
                      value={time}
                      style={getTimeStyles(time, personTime, theme)}
                    >
                      {time}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button type="submit" fullWidth variant="contained">
              Create Appointment
            </Button>
          </Box>
        </Box>
      </div>
    </>
  );
}
