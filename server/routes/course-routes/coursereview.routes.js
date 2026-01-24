// routes/instructor/coursereview.routes.js
const express = require('express');
const router = express.Router();
const courseReviewController = require('../../controllers/course-controller/coursereview.controller');
const authenticate = require('../../middleware/auth-middleware');
const authorizeRoles = require('../../middleware/role-middleware');

router.use(authenticate);

router.get('/', authorizeRoles('student', 'instructor', 'admin'), courseReviewController.getAllCourseReviews);
router.get('/:id', authorizeRoles('student', 'instructor', 'admin'), courseReviewController.getCourseReviewById);
router.post('/', authorizeRoles('student', 'instructor', 'admin'), courseReviewController.createCourseReview);
router.put('/:id', authorizeRoles('instructor', 'admin'), courseReviewController.updateCourseReview);
router.delete('/:id', authorizeRoles('admin'), courseReviewController.deleteCourseReview);

module.exports = router;
