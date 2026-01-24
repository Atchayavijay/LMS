// routes/instructor/quizcontent.routes.js
const express = require('express');
const router = express.Router();
const quizContentController = require('../../controllers/course-controller/quiz.controller');
const authenticate = require('../../middleware/auth-middleware');
const authorizeRoles = require('../../middleware/role-middleware');

router.use(authenticate);

// Use numeric role IDs: 1=learner, 2=instructor, 3=admin
router.get('/', authorizeRoles(1, 2, 3), quizContentController.getAllQuizContents);
router.get('/:id', authorizeRoles(1, 2, 3), quizContentController.getQuizContentById);
router.post('/', authorizeRoles(2, 3), quizContentController.createQuizContent);
router.put('/:id', authorizeRoles(2, 3), quizContentController.updateQuizContent);
router.delete('/:id', authorizeRoles(3), quizContentController.deleteQuizContent);

module.exports = router;
