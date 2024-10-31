import { createSlice } from "@reduxjs/toolkit";
import { enrollments } from "../Database";

const initialState = {
  enrollments: enrollments,
};

const enrollmentsSlice = createSlice({
  name: "enrollments",
  initialState,
  reducers: {
    enroll: (state, { payload: enrollment }) => {
      if (
        !state.enrollments.some(
          (e) => e.user === enrollment.user && e.course === enrollment.course
        )
      ) {
        const newEnrollment = {
          _id: new Date().getTime().toString(),
          user: enrollment.user,
          course: enrollment.course,
        };
        state.enrollments.push(newEnrollment); // Add new enrollment
      }
    },
    unenroll: (state, { payload: enrollment }) => {
      state.enrollments = state.enrollments.filter(
        (e: any) => !(e.user === enrollment.user && e.course === enrollment.course)
      );
    },
  },
});

export const { enroll, unenroll } = enrollmentsSlice.actions;
export default enrollmentsSlice.reducer;