import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Langiding } from "../components/langding";
import { LoginRoute } from "./login.route";
import { RegisterRoute } from "./register.route";
import { ProfileRoute } from "./profile.route";

export const HomeRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<Langiding />} />
      <Route path="/login" element={<LoginRoute />} />
      <Route path="/register" element={<RegisterRoute />} />
      <Route path="/profile" element={<ProfileRoute />} />
      <Route path="/*" element={<Navigate to="/" replace={true} />} />
    </Routes>
  );
};
