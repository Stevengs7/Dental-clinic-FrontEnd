import React, { useEffect, useState } from "react";
import userService from "../_services/userService";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function CreateAppointment() {
  const token = useSelector((state) => state.auth.token);
  const userId = useSelector((state) => state.auth.userInfo.id);
  const [dentist, setDentist] = useState([]);
  const [usersPage, setUsersPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

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
  return <div>CreateAppointment</div>;
}
