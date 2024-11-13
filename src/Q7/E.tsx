import { useSelector, useDispatch } from "react-redux";
import { t, v } from "./c";

const E = () => {
  // const { g, j, m } = useSelector((b) => b.w);
  const { g = 0, j = 0, m = 0 } = useSelector((b: any) => b.w || {});
  const o = useDispatch();
  return (
    <div>
      <h1>{g}</h1>
      <button onClick={() => o(t())}>Q</button> 
      <button onClick={() => o(v(g - m))}>P</button>
      <button onClick={() => o(t())}>F</button>
      <button onClick={() => o(v(j))}>K</button>
    </div>
  );
};
export default E;