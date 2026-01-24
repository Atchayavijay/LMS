import apiClient from '../../../api/apiClient';

/**
 * Authentication Service Layer
 * Encapsulates all auth-related API calls
 */
const authService = {
    login: async (email, password) => {
        // Map frontend "email" to backend "userEmail"
        const response = await apiClient.post('/auth/login', { userEmail: email, password });
        if (response.data.accessToken) {
            localStorage.setItem('token', response.data.accessToken);
            localStorage.setItem('user', JSON.stringify(response.data.user));
        }
        return response.data;
    },

    register: async (userData) => {
        // Map frontend data { name, email, password } to backend { userName, userEmail, password }
        const payload = {
            userName: userData.name,
            userEmail: userData.email,
            password: userData.password,
            roles: userData.roles || [1] // Default to learner [1] if not provided
        };
        const response = await apiClient.post('/auth/register', payload);
        return response.data;
    },

    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    },

    getCurrentUser: () => {
        const userStr = localStorage.getItem('user');
        return userStr ? JSON.parse(userStr) : null;
    },

    submitEnrollment: async (data) => {
        const response = await apiClient.post('/auth/submit-enrollment', data);
        // Update local storage user if needed, but slice will handle state
        return response.data;
    },

    approveInstructor: async (userId, action) => {
        const response = await apiClient.post('/auth/admin-approve', { userId, action });
        return response.data;
    },

    becomeInstructor: async (email) => {
        const response = await apiClient.post('/auth/become-instructor', { userEmail: email });
        // We might want to update local storage user here if the backend returns the updated user
        if (response.data.success && response.data.user) {
            const userStr = localStorage.getItem('user');
            if (userStr) {
                const currentUser = JSON.parse(userStr);
                // Merge updates
                const updatedUser = { ...currentUser, ...response.data.user };
                // Re-calculate role for UI if needed (logic from login)
                // Or just trust the component to refresh profile. 
                // Simple update:
                localStorage.setItem('user', JSON.stringify(updatedUser));
            }
        }
        return response.data;
    }
};

export default authService;
