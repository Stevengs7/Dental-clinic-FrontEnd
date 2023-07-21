import axios from "axios";

import { global } from "../_config/global";

const adminService = {};

adminService.getAll = async (token, page = 1) => {
  const options = {
    method: "GET",
    url: `${global.BASE_API_URL}/api/admin/all-users`,
    params: { page: page },
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  //await sleep(2000); // TODO
  const response = await axios.request(options);
  return response.data;
};

adminService.getPatient = async (token, page = 1) => {
  const options = {
    method: "GET",
    url: `${global.BASE_API_URL}/api/admin/all-patients`,
    params: { page: page },
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  //await sleep(2000); // TODO
  const response = await axios.request(options);
  return response.data;
};

adminService.getDentist = async (token, page = 1) => {
  const options = {
    method: "GET",
    url: `${global.BASE_API_URL}/api/admin/all-dentists`,
    params: { page: page },
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  //await sleep(2000); // TODO
  const response = await axios.request(options);
  return response.data;
};

export default adminService;
