import * as React from "react";
import { Routes, Route } from 'react-router-dom';
import { Home } from "./home/Home";
import { Profile } from "./profile/Profile";

export const Router = () => (
  <Routes>
    <Route path="/" element={<Home/>} />
    <Route path="/me" element={<Profile/>} />
  </Routes>
);
