// controllers/instructor-controller/resourcecontent.controller.js
const ResourceContent = require('../../models/ResourceContent');
const createCrudController = require('../common/crud.controller');

const crud = createCrudController(ResourceContent);
exports.getAllResourceContents = crud.getAll;
exports.getResourceContentById = crud.getById;
exports.createResourceContent = crud.create;
exports.updateResourceContent = crud.update;
exports.deleteResourceContent = crud.delete;
