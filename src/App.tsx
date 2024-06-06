import { router } from "./routes/Routes";
import { Toaster } from "./components/ui/toaster";
import { RouterProvider } from "react-router-dom";
import "./global.css";

const App = () => {
  return (
    <main className="flex h-screen">
      <RouterProvider router={router} />
      <Toaster />
    </main>
  );
};

export default App;
