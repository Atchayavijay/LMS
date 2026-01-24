// routes/instructor/resourcecontent.routes.js
const express = require('express');
const router = express.Router();
const resourceContentController = require('../../controllers/course-controller/resource.controller');
const authenticate = require('../../middleware/auth-middleware');
const authorizeRoles = require('../../middleware/role-middleware');

router.use(authenticate);

// Use numeric role IDs: 1=learner, 2=instructor, 3=admin
router.get('/', authorizeRoles(1, 2, 3), resourceContentController.getAllResourceContents);
router.get('/:id', authorizeRoles(1, 2, 3), resourceContentController.getResourceContentById);
router.post('/', authorizeRoles(2, 3), resourceContentController.createResourceContent);
router.put('/:id', authorizeRoles(2, 3), resourceContentController.updateResourceContent);
router.delete('/:id', authorizeRoles(3), resourceContentController.deleteResourceContent);

module.exports = router;
