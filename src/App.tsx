import { router } from "./routes/Routes";
import { RouterProvider } from "react-router-dom";
import "./global.css";

const App = () => {
  return (
    <main className="flex h-screen">
      <RouterProvider router={router} />
    </main>
  );
};

export default App;
