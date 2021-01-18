const express = require('express')
const router = express.Router();
const passport = require('passport');


const postController = require('../controllers/postController');
const userController = require('../controllers/userControlles');

/**
 * Router for Posts
 */
router.get('/posts', passport.authenticate('jwt', { session: false }), postController.getAllPosts);
router.get('/post/:id', postController.getPostById);
router.put('/post/:id', postController.updatePost);
router.post('/post/create', postController.createPost);
router.delete('/post/:id', postController.deletePost);

/**
 * Router for Users
 */
 router.post('/login', userController.login);
 router.post('/register', userController.register);
 router.get('/confirm', userController.confirm);
 router.get('/current-user', userController.currentUser)

module.exports = router;
