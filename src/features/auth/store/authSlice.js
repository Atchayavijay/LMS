import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from '../services/authService';

// Async Thunks
export const login = createAsyncThunk('auth/login', async ({ email, password }, thunkAPI) => {
    try {
        // Mock login response for dev/demo purposes if API fails or for simulation
        // In a real app, this would come from the backend
        if (email === 'admin@kattran.com') {
            return {
                user: { name: 'Admin User', email, role: 'admin', status: 'active' },
                token: 'mock-admin-token'
            };
        }
        return await authService.login(email, password);
    } catch (error) {
        const message = error.response?.data?.message || error.message;
        return thunkAPI.rejectWithValue(message);
    }
});

export const register = createAsyncThunk('auth/register', async (userData, thunkAPI) => {
    try {
        await authService.register(userData);
        // Auto-login after registration to get the token
        return await authService.login(userData.email, userData.password);
    } catch (error) {
        const message = error.response?.data?.message || error.message;
        return thunkAPI.rejectWithValue(message);
    }
});

// New Thunk for Instructor Registration
// New Thunk for Instructor Registration
export const registerInstructor = createAsyncThunk('auth/registerInstructor', async (userData, thunkAPI) => {
    try {
        // Register as instructor (Role ID 2)
        const response = await authService.register({ ...userData, roles: [2] });
        return response; // Just return success, no auto-login
    } catch (error) {
        const message = error.response?.data?.message || error.message;
        return thunkAPI.rejectWithValue(message);
    }
});

// Async Thunk for Enrollment
export const submitEnrollment = createAsyncThunk('auth/submitEnrollment', async (data, thunkAPI) => {
    try {
        const response = await authService.submitEnrollment(data);
        return response.user; // Expecting updated user object
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
});

// Async Thunk for Approval (Simulated Admin)
export const approveInstructor = createAsyncThunk('auth/approveInstructor', async ({ userId, action }, thunkAPI) => {
    try {
        const response = await authService.approveInstructor(userId, action);
        return response.user;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
});

/**
 * Initial state for Authentication
 */
const initialState = {
    user: JSON.parse(localStorage.getItem('user')) || null,
    token: localStorage.getItem('token') || null,
    isAuthenticated: !!localStorage.getItem('token'),
    loading: false,
    error: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            authService.logout();
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
        },
        clearError: (state) => {
            state.error = null;
        },

    },
    extraReducers: (builder) => {
        builder
            // Login lifecycle
            .addCase(login.pending, (state) => {
                state.loading = true;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.isAuthenticated = true;
                state.user = action.payload.user;
                state.token = action.payload.accessToken;
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Register lifecycle
            .addCase(register.pending, (state) => {
                state.loading = true;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.loading = false;
                state.isAuthenticated = true;
                state.user = action.payload.user;
                state.token = action.payload.token;
            })
            .addCase(register.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Instructor Register Lifecycle
            .addCase(registerInstructor.pending, (state) => {
                state.loading = true;
            })
            .addCase(registerInstructor.fulfilled, (state) => {
                state.loading = false;
                // Do not set isAuthenticated true here. User must login manually.
            })
            .addCase(registerInstructor.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Submit Enrollment
            .addCase(submitEnrollment.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                // Update local storage
                localStorage.setItem('user', JSON.stringify(action.payload));
            })
            // Approve Instructor
            .addCase(approveInstructor.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                localStorage.setItem('user', JSON.stringify(action.payload));
            });
    },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
