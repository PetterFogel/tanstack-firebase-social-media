import { Outlet } from "react-router-dom";

const PublicLayout = () => {
  return (
    <div>
      <h2>Public Layout</h2>
      <Outlet />
    </div>
  );
};

export default PublicLayout;
