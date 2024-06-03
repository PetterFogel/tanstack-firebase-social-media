import { Button } from "./components/ui/button";
import "./global.css";

const App = () => {
  return (
    <div>
      <h1 className="text-5xl text-orange-400">Hello, World</h1>
      <Button onClick={() => console.log("Click")}>Click</Button>
    </div>
  );
};

export default App;
