import { createEntityAdapter } from '@reduxjs/toolkit'
const courseAdapter = createEntityAdapter();

const initialState = courseAdapter.getInitialState();
const CourseSlice = createSlice({
    name: 'Course',
    initialState,
    reducers: {
        courseAdded: courseAdapter.addOne,
        courseAdded: courseAdapter.addMany,
        courseUpdated: courseAdapter.updateOne,
        courseDeleted: courseAdapter.removeOne,
        courseAllRemoved: courseAdapter.removeAll,
    }
})
export const { courseAdded, courseMany, courseUpdated, courseDeleted, courseAllRemoved } = CourseSlice.actions;
export const couresSelectors = courseAdapter.getSelectors((state) => state.courses) // means "all "
export default CourseSlice.reducer;