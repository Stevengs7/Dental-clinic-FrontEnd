import React from "react";
import { Route, Routes, Navigate } from "react-router";

// pages
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import OurDentistPage from "./pages/OurDentistPage";
import ProfilePage from "./pages/ProfilePage";
import ProfileDentistPage from "./pages/ProfileDentistPage";
import ProfileEdit from "./pages/ProfileEdit";
import CreateAppointment from "./pages/CreateAppointment";
import AdminPage from "./pages/AdminPage";
import AboutPage from "./pages/AboutPage";
import Page404 from "./pages/Page404";

export default function AppRouter() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dentist" element={<OurDentistPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/dentist-profile" element={<ProfileDentistPage />} />
        <Route path="/profile-edit" element={<ProfileEdit />} />
        <Route path="/create-appointment" element={<CreateAppointment />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/404" element={<Page404 />} />
        <Route path="*" element={<Navigate to="/404" />} />
      </Routes>
    </div>
  );
}
