import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    courses: [
        { id: 1, title: 'Advanced Node.js Architecture', status: 'Published', students: 432, rating: 4.8, price: 49.99, sections: 12, lectures: 45, thumbnail: null },
        { id: 2, title: 'React Performance at Scale', status: 'Published', students: 128, rating: 4.9, price: 79.99, sections: 8, lectures: 32, thumbnail: null },
        { id: 3, title: 'UI Transformation Masterclass', status: 'Draft', students: 0, rating: 0, price: 29.99, sections: 5, lectures: 15, thumbnail: null },
        { id: 4, title: 'System Design for Frontend', status: 'Published', students: 86, rating: 4.7, price: 59.99, sections: 10, lectures: 40, thumbnail: null },
    ],
    activeCourse: null,
    loading: false,
    error: null,
};

const courseSlice = createSlice({
    name: 'courses',
    initialState,
    reducers: {
        setCourses: (state, action) => {
            state.courses = action.payload;
        },
        addCourse: (state, action) => {
            state.courses.push({
                ...action.payload,
                id: state.courses.length + 1,
                students: 0,
                rating: 0,
                sections: 0,
                lectures: 0,
                status: 'Draft',
            });
        },
        updateCourse: (state, action) => {
            const index = state.courses.findIndex(c => c.id === action.payload.id);
            if (index !== -1) {
                state.courses[index] = { ...state.courses[index], ...action.payload };
            }
        },
        deleteCourse: (state, action) => {
            state.courses = state.courses.filter(c => c.id !== action.payload);
        },
        setActiveCourse: (state, action) => {
            state.activeCourse = action.payload;
        },
        clearActiveCourse: (state) => {
            state.activeCourse = null;
        }
    },
});

export const { setCourses, addCourse, updateCourse, deleteCourse, setActiveCourse, clearActiveCourse } = courseSlice.actions;
export default courseSlice.reducer;
