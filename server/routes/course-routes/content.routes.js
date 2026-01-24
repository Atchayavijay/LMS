// routes/instructor/content.routes.js
const express = require('express');
const router = express.Router();
const contentController = require('../../controllers/course-controller/content.controller');
const authenticate = require('../../middleware/auth-middleware');
const authorizeRoles = require('../../middleware/role-middleware');

router.use(authenticate);

// Use numeric role IDs: 1=learner, 2=instructor, 3=admin
router.get('/', authorizeRoles(1, 2, 3), contentController.getAllContents);
router.get('/:id', authorizeRoles(1, 2, 3), contentController.getContentById);
router.post('/', authorizeRoles(2, 3), contentController.createContent);
router.put('/:id', authorizeRoles(2, 3), contentController.updateContent);
router.delete('/:id', authorizeRoles(2,3), contentController.deleteContent);

module.exports = router;
