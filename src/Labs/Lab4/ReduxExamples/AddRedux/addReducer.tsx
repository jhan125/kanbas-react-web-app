import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sum: 0,
};

// add reducer function can keep track of the arithmetic addition of two parameters. 
// the parameters are encoded as an object into a payload property found in the action parameter passed to the reducer function. 
// Functions can extract parameters a and b as action.payload.a and action.payload.b and then use the parameters to update the sum state variable.
const addSlice = createSlice({
  name: "add",
  initialState,
  reducers: {
    add: (state, action) => {
      state.sum = action.payload.a + action.payload.b;
    },
  },
});

export const { add } = addSlice.actions;
export default addSlice.reducer;