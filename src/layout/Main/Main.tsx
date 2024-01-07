import { Outlet } from "react-router";

import Header from "../../components/Header/Header";

const Main = (): JSX.Element => {
  return (
    <div>
      <Header />

      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Main;
