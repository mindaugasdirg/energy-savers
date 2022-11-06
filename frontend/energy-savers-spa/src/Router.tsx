import * as React from "react";
import { Routes, Route } from "react-router-dom";
import { Camera } from "./camera/Camera";
// import { Home } from "./home/Home";
import { EnergyPie } from "./plot/EnergyPie";
import { Profile } from "./profile/Profile";
import { WeeklyStats } from "./stats/WeeklyStats";

export const Router = () => (
  <Routes>
    {/* real paths */}
    <Route
      path="/"
      element={
        <EnergyPie
          data={{
            labels: [
              "Transportation",
              "Groceries",
              "Clothing",
              "Electric Usage",
              "Travel",
              "Miscellaneous",
            ],
            values: [12, 19, 3, 5, 2, 3],
          }}
        />
      }
    />
    <Route path="/scan" element={<Camera />} />
    {/* dev paths */}
    <Route path="/me" element={<Profile />} />
    <Route path="/weekly-stats" element={<WeeklyStats />} />
    <Route path="/camera" element={<Camera />} />
  </Routes>
);
