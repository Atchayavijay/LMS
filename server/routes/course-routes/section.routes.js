// routes/instructor/section.routes.js
const express = require('express');
const router = express.Router();
const sectionController = require('../../controllers/course-controller/section.controller');
const authenticate = require('../../middleware/auth-middleware');
const authorizeRoles = require('../../middleware/role-middleware');

router.use(authenticate);

// Use numeric role IDs: 1=learner, 2=instructor, 3=admin
router.get('/', authorizeRoles(1, 2, 3), sectionController.getAllSections);
router.get('/:id', authorizeRoles(1, 2, 3), sectionController.getSectionById);
router.post('/', authorizeRoles(2, 3), sectionController.createSection);
router.put('/:id', authorizeRoles(2, 3), sectionController.updateSection);
router.delete('/:id', authorizeRoles(2,3), sectionController.deleteSection);

module.exports = router;
