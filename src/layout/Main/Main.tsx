import React from "react";
import { Outlet } from "react-router";

const Main = (): JSX.Element => {
  return (
    <div>
      <nav>Nav</nav>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Main;
