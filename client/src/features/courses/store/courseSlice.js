import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import courseService from '../services/courseService';

export const fetchInstructorCourses = createAsyncThunk(
    'courses/fetchInstructorCourses',
    async (_, thunkAPI) => {
        try {
            const response = await courseService.getInstructorCourses();
            return response.data;
        } catch (error) {
            const message = error.response?.data?.message || error.message;
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const createCourse = createAsyncThunk(
    'courses/createCourse',
    async (courseData, thunkAPI) => {
        try {
            const response = await courseService.createCourse(courseData);
            return response.data;
        } catch (error) {
            const message = error.response?.data?.message || error.message;
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const updateCourse = createAsyncThunk(
    'courses/updateCourse',
    async ({ id, courseData }, thunkAPI) => {
        try {
            const response = await courseService.updateCourse(id, courseData);
            return response.data;
        } catch (error) {
            const message = error.response?.data?.message || error.message;
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const deleteCourse = createAsyncThunk(
    'courses/deleteCourse',
    async (id, thunkAPI) => {
        try {
            await courseService.deleteCourse(id);
            return id;
        } catch (error) {
            const message = error.response?.data?.message || error.message;
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const cloneCourse = createAsyncThunk(
    'courses/cloneCourse',
    async (id, thunkAPI) => {
        try {
            const response = await courseService.cloneCourse(id);
            return response.data;
        } catch (error) {
            const message = error.response?.data?.message || error.message;
            return thunkAPI.rejectWithValue(message);
        }
    }
);

const initialState = {
    courses: [],
    activeCourse: null,
    loading: false,
    error: null,
};

const courseSlice = createSlice({
    name: 'courses',
    initialState,
    reducers: {
        clearActiveCourse: (state) => {
            state.activeCourse = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // Fetch
            .addCase(fetchInstructorCourses.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchInstructorCourses.fulfilled, (state, action) => {
                state.loading = false;
                state.courses = action.payload;
            })
            .addCase(fetchInstructorCourses.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Create
            .addCase(createCourse.fulfilled, (state, action) => {
                state.courses.unshift(action.payload);
            })
            // Update
            .addCase(updateCourse.fulfilled, (state, action) => {
                const index = state.courses.findIndex((c) => (c._id || c.id) === action.payload._id);
                if (index !== -1) {
                    state.courses[index] = action.payload;
                }
            })
            // Delete
            .addCase(deleteCourse.fulfilled, (state, action) => {
                state.courses = state.courses.filter((c) => (c._id || c.id) !== action.payload);
            })
            // Clone
            .addCase(cloneCourse.fulfilled, (state, action) => {
                state.courses.unshift(action.payload);
            });
    }
});

export const { clearActiveCourse } = courseSlice.actions;
export default courseSlice.reducer;
