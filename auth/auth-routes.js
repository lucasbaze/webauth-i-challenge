const router = require('express').Router();
const Users = require('./auth-model');

router.get('/users', async (req, res) => {
    let users = await Users.getUsers();
    res.status(200).json(users);
});

router.post('/register', registerReqs, async (req, res, next) => {
    let user = req.body;

    let createdUser = await Users.addUser(user);
    res.status(200).json(createdUser);
});

//
//Middleware
function registerReqs(req, res, next) {
    let user = req.body;

    if (!user || !user.username || !user.password) {
        next('Missing Parameters');
    }

    if (user.password.length < 8) {
        next('Password must be at least 8 chars');
    }

    next();
}

//TODO: username taken handler

module.exports = router;
