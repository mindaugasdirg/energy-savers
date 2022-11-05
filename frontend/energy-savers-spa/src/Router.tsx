import * as React from "react";
import { Routes, Route } from 'react-router-dom';
import { Home } from "./home/Home";
import { Main } from "./main/Main";
import { Profile } from "./profile/Profile";
import { WeeklyStats } from "./stats/WeeklyStats";

export const Router = () => (
  <Routes>
    <Route path="/" element={<Main/>} />
    <Route path="/me" element={<Profile/>} />
    <Route path="/weekly-stats" element={<WeeklyStats/>} />
  </Routes>
);
