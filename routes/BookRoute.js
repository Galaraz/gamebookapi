const { Router } = require('express');
const BookController = require('../controller/BookController');

const BookRoute = Router();

BookRoute
  .get('/', BookController.getAllBooks)
  .post('/', BookController.addBook);

BookRoute
  .get('/search', BookController.searchBook);
  
BookRoute 
  .get('/:id', BookController.getOneBook)
  .put('/:id', BookController.editBook)
  .delete('/:id', BookController.deleteBook); 
 
module.exports = BookRoute;
