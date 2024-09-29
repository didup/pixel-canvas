import SnakePaint from "./snake-paint/SnakePaint";

const Paint = () => {
  return (
    <SnakePaint>
      <SnakePaint.Canvas />
      <SnakePaint.Controls/>
    </SnakePaint>
  );
};

export default Paint;
