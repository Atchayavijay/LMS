// controllers/instructor-controller/quizcontent.controller.js
const QuizContent = require('../../models/QuizContent');
const createCrudController = require('../common/crud.controller');

const crud = createCrudController(QuizContent);
exports.getAllQuizContents = crud.getAll;
exports.getQuizContentById = crud.getById;
exports.createQuizContent = crud.create;
exports.updateQuizContent = crud.update;
exports.deleteQuizContent = crud.delete;
