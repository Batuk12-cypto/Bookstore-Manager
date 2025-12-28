const express = require('express');
const { handleBookStoreController, handleBookListController, handleBookDeleteController, handleBookUpdateController } = require('../controller/book.controller');

const router = express.Router();

// create
router.post('/addbook', handleBookStoreController);

// list (GET)
router.get('/booklist', handleBookListController);

// delete (DELETE with id param)
router.delete('/deletebook/:id', handleBookDeleteController);

// update (PUT with id param)
router.put('/updatebook/:id', handleBookUpdateController);

module.exports = router;