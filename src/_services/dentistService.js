import axios from "axios";

import { global } from "../_config/global";

const dentistService = {};

dentistService.getMyProfile = async (token) => {
  const options = {
    method: "GET",
    url: `${global.BASE_API_URL}/api/dentist/my-profile`,
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  //await sleep(2000); // TODO
  const response = await axios.request(options);
  return response.data;
};

dentistService.getMyAppointments = async (token) => {
  const options = {
    method: "GET",
    url: `${global.BASE_API_URL}/api/dentist/my-appointments`,
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  //await sleep(2000); // TODO
  const response = await axios.request(options);
  return response.data;
};

dentistService.deleteAppointment = async (token, value) => {
  const options = {
    method: "DELETE",
    url: `${global.BASE_API_URL}/api/dentist/delete-appointment`,
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

export default dentistService;
