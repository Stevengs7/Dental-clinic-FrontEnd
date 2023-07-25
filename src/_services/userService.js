import axios from "axios";

import { global } from "../_config/global";

const userService = {};

// Get my Profile ----------------------------------------------------

userService.getMyProfile = async (token) => {
  const options = {
    method: "GET",
    url: `${global.BASE_API_URL}/api/users/profile`,
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  //await sleep(2000); // TODO
  const response = await axios.request(options);
  return response.data;
};

// Update my Profile ----------------------------------------------------

userService.updateMyProfile = async (token, updates) => {
  const options = {
    method: "PUT",
    url: `${global.BASE_API_URL}/api/users/update-profile`,
    data: updates,
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  //await sleep(2000); // TODO
  const response = await axios.request(options);
  return response.data;
};

// Get Appointments ----------------------------------------------------

userService.getMyAppointments = async (token) => {
  const options = {
    method: "GET",
    url: `${global.BASE_API_URL}/api/users/my-appointments`,
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  //await sleep(2000); // TODO
  const response = await axios.request(options);
  return response.data;
};

// Delete Appointment----------------------------------------------------

userService.deleteAppointment = async (token, value) => {
  const options = {
    method: "DELETE",
    url: `${global.BASE_API_URL}/api/users/appointment-delete`,
    data: value,
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  //await sleep(2000); // TODO
  const response = await axios.request(options);
  return response.data;
};

// Create Appointment ----------------------------------------------------

userService.CreateAppointment = async (token, value) => {
  const options = {
    method: "POST",
    url: `${global.BASE_API_URL}/api/users/new-appointment`,
    data: value,
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  //await sleep(2000); // TODO
  const response = await axios.request(options);
  return response.data;
};

// Get All Detnist ----------------------------------------------------

userService.getAllDentists = async (token, usersPage) => {
  const options = {
    method: "GET",
    url: `${global.BASE_API_URL}/api/users/all-dentists`,
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  //await sleep(2000); // TODO
  const response = await axios.request(options);
  return response.data;
};

export default userService;
