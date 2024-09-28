import { createRoot } from "react-dom/client";

import Paint from "./Paint";

const App = () => {
  return (
    <div className="card">
      <h2>{"SnakePaint"}</h2>
      <Paint />
    </div>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
