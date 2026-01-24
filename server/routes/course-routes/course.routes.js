// routes/instructor/course.routes.js
const express = require('express');
const router = express.Router();
const courseController = require('../../controllers/course-controller/course.controller');
const authenticate = require('../../middleware/auth-middleware');
const authorizeRoles = require('../../middleware/role-middleware');

router.use(authenticate);

// Public/Platform routes
router.get('/', authorizeRoles(1, 2, 3), courseController.getAll);

// Instructor-specific routes
router.get('/instructor', authorizeRoles(2, 3), courseController.getInstructorCourses);
router.post('/clone/:id', authorizeRoles(2, 3), courseController.cloneCourse);

// Single course management
router.get('/:id', authorizeRoles(1, 2, 3), courseController.getById);
router.post('/', authorizeRoles(2, 3), courseController.create);
router.put('/:id', authorizeRoles(2, 3), courseController.update);
router.delete('/:id', authorizeRoles(2, 3), courseController.delete);

module.exports = router;
