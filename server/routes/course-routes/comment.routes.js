// routes/instructor/comment.routes.js
const express = require('express');
const router = express.Router();
const commentController = require('../../controllers/course-controller/comment.controller');
const authenticate = require('../../middleware/auth-middleware');
const authorizeRoles = require('../../middleware/role-middleware');

router.use(authenticate);

// Use numeric role IDs: 1=learner, 2=instructor, 3=admin
router.get('/', authorizeRoles(1, 2, 3), commentController.getAllComments);
router.get('/:id', authorizeRoles(1, 2, 3), commentController.getCommentById);
router.post('/', authorizeRoles(1, 2, 3), commentController.createComment);
router.put('/:id', authorizeRoles(2, 3), commentController.updateComment);
router.delete('/:id', authorizeRoles(3), commentController.deleteComment);

module.exports = router;
