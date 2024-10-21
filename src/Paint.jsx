import SnakePaint from "./snake-paint/contexts/PaintContextWrapper";

const Paint = () => {

  
  return (
    <SnakePaint>
      <SnakePaint.Canvas />
      <SnakePaint.Controls />
    </SnakePaint>
  );
};

export default Paint;
