// controllers/instructor-controller/articlecontent.controller.js
const ArticleContent = require('../../models/ArticleContent');
const createCrudController = require('../common/crud.controller');

const crud = createCrudController(ArticleContent);
exports.getAllArticleContents = crud.getAll;
exports.getArticleContentById = crud.getById;
exports.createArticleContent = crud.create;
exports.updateArticleContent = crud.update;
exports.deleteArticleContent = crud.delete;
