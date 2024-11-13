import s from "./s";
import E from "./E";
import { Provider } from "react-redux";

function App() {
  return (
    <Provider store={s}>
      <E />
    </Provider>
  );
}
export default App;
