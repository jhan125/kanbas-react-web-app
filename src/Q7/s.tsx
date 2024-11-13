import { configureStore } from "@reduxjs/toolkit";
import w from "./c";

const s = configureStore({
  reducer: { w }
});

export default s;
