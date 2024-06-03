import { Outlet } from "react-router-dom";

const PrivateLayout = () => {
  return (
    <div>
      <h2>Private Layout</h2>
      <Outlet />
    </div>
  );
};

export default PrivateLayout;
