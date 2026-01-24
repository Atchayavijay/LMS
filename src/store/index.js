import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/store/authSlice';
import courseReducer from '../features/courses/store/courseSlice';

/**
 * Central Redux Store Configuration
 * As the app scales, we can add more reducers here (e.g., courseReducer, uiReducer)
 */
export const store = configureStore({
    reducer: {
        auth: authReducer,
        courses: courseReducer,
        // Add other feature reducers here
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false, // Useful for large objects like course datasets
        }),
});

export default store;
