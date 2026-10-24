import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";

const courseAdapter = createEntityAdapter();

const initialState = courseAdapter.getInitialState();

const CourseSlice = createSlice({
  name: "Course",
  initialState,
  reducers: {
    courseAdded: courseAdapter.addOne,
    courseMany: courseAdapter.addMany,
    courseUpdated: courseAdapter.updateOne,
    courseRemoved: courseAdapter.removeOne,
    courseAllRemoved: courseAdapter.removeAll,
  },
});

export const {
  courseAdded,
  courseMany,
  courseUpdated,
  courseRemoved,
  courseAllRemoved,
} = CourseSlice.actions;

export const couresSelectors = courseAdapter.getSelectors(
  (state) => state.courses
);

export default CourseSlice.reducer;
