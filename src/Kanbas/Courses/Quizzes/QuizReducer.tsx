import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    quizzes: [],
};

const quizzesSlice = createSlice({
    name: "quizzes",
    initialState,
    reducers: {
        setQuizzes: (state, action) => {
            state.quizzes = action.payload;
        },
        addQuizzes: (state, { payload: quiz }) => {
            const newQuiz: any = {
            ...quiz,
        };
        state.quizzes = [...state.quizzes, newQuiz] as any;
      },
        deleteQuizzes: (state, { payload: quizId }) => {
            state.quizzes = state.quizzes.filter(
            (a: any) => a._id !== quizId
        );
      },
      updateQuizzes: (state, { payload: quiz }) => {
        state.quizzes = state.quizzes.map((a: any) =>
          a._id === quiz._id ? quiz : a
        ) as any;
      },
   }
});
export const { setQuizzes, addQuizzes, deleteQuizzes, updateQuizzes} = quizzesSlice.actions;
export default quizzesSlice.reducer;