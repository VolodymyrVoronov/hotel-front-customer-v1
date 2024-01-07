import { Outlet } from "react-router";

import Header from "../../components/Header/Header";

const Main = (): JSX.Element => {
  return (
    <div>
      <Header />

      <main>
        <Outlet />
      </main>

      <footer>
        <p>Footer</p>
      </footer>
    </div>
  );
};

export default Main;
