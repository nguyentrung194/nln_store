import React from "react";

import { Outlet } from "react-router-dom";
import { NavAdmin } from "../components/admin/nav";

export const AdminLayout = () => {
  const clientHeight = document.getElementById("nav-thanh")?.clientHeight || 80;
  return (
    <>
      <div className="grid grid-cols-12">
        <div
          className="parent-nav-admin w-1/6"
          style={{
            position: "fixed",
            top: clientHeight,
            left: 0,
          }}
        >
          <NavAdmin />
        </div>
        <div className="col-span-2 -z-10"></div>
        <div className="col-span-10">
          <Outlet />
        </div>
      </div>
    </>
  );
};
