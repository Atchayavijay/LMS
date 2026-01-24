// routes/instructor/chapter.routes.js
const express = require('express');
const router = express.Router();
const chapterController = require('../../controllers/course-controller/chapter.controller');
const authenticate = require('../../middleware/auth-middleware');
const authorizeRoles = require('../../middleware/role-middleware');

router.use(authenticate);

// Use numeric role IDs: 1=learner, 2=instructor, 3=admin
router.get('/', authorizeRoles(1, 2, 3), chapterController.getAllChapters);
router.get('/:id', authorizeRoles(1, 2, 3), chapterController.getChapterById);
router.post('/', authorizeRoles(2, 3), chapterController.createChapter);
router.put('/:id', authorizeRoles(2, 3), chapterController.updateChapter);
router.delete('/:id', authorizeRoles(2,3), chapterController.deleteChapter);

module.exports = router;
