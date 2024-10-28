import { useSelector, useDispatch } from "react-redux";
// to maintain a and b parameters in UI
import { useState } from "react";
import { add } from "./addReducer";

export default function AddRedux() {
  // a and b state variables to edit parameters to add in the reducer
  const [a, setA] = useState(12);
  const [b, setB] = useState(23);
  // read the sum state variable from the reducer
  const { sum } = useSelector((state: any) => state.addReducer);
  // dispatch to call add redux function
  const dispatch = useDispatch();

  // render local state variables a and b, as well as application state variable sum
  // on click, call add reducer function to compute the arithmetic addition of a and b,
  // and store it in application state variable sum
  return (
    <div className="w-25" id="wd-add-redux">
      <h1>Add Redux</h1>
      <h2>
        {a} + {b} = {sum}
      </h2>
  
      <input
        type="number"
        value={a}
        onChange={(e) => setA(parseInt(e.target.value))}
        className="form-control"
      />

      <input
        type="number"
        value={b}
        onChange={(e) => setB(parseInt(e.target.value))}
        className="form-control"
      />

      <button
        className="btn btn-primary"
        id="wd-add-redux-click"
        onClick={() => dispatch(add({ a, b }))}
      >
        Add Redux
      </button>

      <hr />
    </div>
  );
}