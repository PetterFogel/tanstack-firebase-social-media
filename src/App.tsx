import { router } from "./routes/Routes";
import { Button } from "./components/ui/button";
import { RouterProvider } from "react-router-dom";
import "./global.css";

const App = () => {
  return (
    <main>
      <h1 className="text-5xl text-orange-400">Hello, World</h1>
      <Button onClick={() => console.log("Click")}>Click</Button>
      <RouterProvider router={router} />
    </main>
  );
};

export default App;
