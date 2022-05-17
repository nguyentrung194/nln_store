import React from "react";

import { Outlet } from "react-router-dom";
import { Nav } from "../components/nav";

export const NavLayout = () => {
  const clientHeight = document.getElementById("nav-thanh")?.clientHeight || 80;

  return (
    <>
      <Nav />
      <div
        className=""
        style={{
          paddingTop: clientHeight,
        }}
      >
        <Outlet />
      </div>
    </>
  );
};
