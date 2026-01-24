import apiClient from '../../../api/apiClient';

const courseService = {
    // Fetch courses for the current instructor
    getInstructorCourses: async () => {
        const response = await apiClient.get('/courses/instructor');
        return response.data;
    },

    // Get single course details
    getCourseById: async (id) => {
        const response = await apiClient.get(`/courses/${id}`);
        return response.data;
    },

    // Create a new course
    createCourse: async (courseData) => {
        const response = await apiClient.post('/courses', courseData);
        return response.data;
    },

    // Update an existing course
    updateCourse: async (id, courseData) => {
        const response = await apiClient.put(`/courses/${id}`, courseData);
        return response.data;
    },

    // Delete a course
    deleteCourse: async (id) => {
        const response = await apiClient.delete(`/courses/${id}`);
        return response.data;
    },

    // --- Section Management ---
    createSection: async (sectionData) => {
        const response = await apiClient.post('/sections', sectionData);
        return response.data;
    },
    updateSection: async (id, sectionData) => {
        const response = await apiClient.put(`/sections/${id}`, sectionData);
        return response.data;
    },
    deleteSection: async (id) => {
        const response = await apiClient.delete(`/sections/${id}`);
        return response.data;
    },

    // --- Chapter Management ---
    createChapter: async (chapterData) => {
        const response = await apiClient.post('/chapters', chapterData);
        return response.data;
    },
    updateChapter: async (id, chapterData) => {
        const response = await apiClient.put(`/chapters/${id}`, chapterData);
        return response.data;
    },
    deleteChapter: async (id) => {
        const response = await apiClient.delete(`/chapters/${id}`);
        return response.data;
    },

    // --- Content Management ---
    uploadMedia: async (file) => {
        const formData = new FormData();
        formData.append('file', file);
        const response = await apiClient.post('/media/upload', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        return response.data;
    },
    createContent: async (type, data) => {
        // Map types to their specific endpoints
        const endpointMap = {
            video: '/videocontents',
            quiz: '/quizcontents',
            resource: '/resourcecontents',
            article: '/articlecontents',
            audio: '/audiocontents',
            image: '/imagecontents'
        };
        const endpoint = endpointMap[type] || '/contents';
        const response = await apiClient.post(endpoint, data);
        return response.data;
    },

    // Clone a course
    cloneCourse: async (id) => {
        const response = await apiClient.post(`/courses/clone/${id}`);
        return response.data;
    }
};

export default courseService;
