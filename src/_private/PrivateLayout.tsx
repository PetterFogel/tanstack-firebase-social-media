import { Outlet } from "react-router-dom";

const PrivateLayout = () => {
  return (
    <div>
      <h2>Side Menu</h2>
      <Outlet />
    </div>
  );
};

export default PrivateLayout;
