import { createRoot } from "react-dom/client";

import Paint from "./Paint";



const App = () => {
  const { size, setSize } = useStoreCanvasOptions();

  return (
    <div className="card">
      <h1>Paint App</h1>
      <h2>{size}</h2>
      <Paint />
    </div>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
