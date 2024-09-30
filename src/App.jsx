import { createRoot } from "react-dom/client";

import Paint from "./Paint";
import { StrictMode } from "react";

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
root.render(
  <StrictMode>
    <App />
  </StrictMode>,
);
