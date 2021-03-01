const router = require('express').Router();
const auth = require('./middlewares/auth');
const UserController = require('./controllers/UserController');

router.post('/register', UserController.registerUser);
router.post('/login', UserController.loginUser);
router.post('/logout', UserController.logoutUser);
router.get('/logged', UserController.getLogged);
router.get('/users', auth, UserController.getAllUsers);
router.get('/user/:id', auth, UserController.getUserById);

module.exports = router;
