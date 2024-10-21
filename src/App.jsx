import { createRoot } from "react-dom/client";
import { StrictMode } from "react";

import ActiveCanvas from "./snake-paint/components/ActiveCanvas";
import Controls from "./snake-paint/components/Controls";
import PaintContextWrapper from "./snake-paint/contexts/PaintContextWrapper";

const App = () => {
  return (
    <div className="card">
      <h2>{"SnakePaint"}</h2>
      <PaintContextWrapper>
        <ActiveCanvas />
        <Controls />
      </PaintContextWrapper>
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
