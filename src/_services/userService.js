import axios from "axios";

import { global } from "../_config/global";

const userService = {};

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

export default userService;
