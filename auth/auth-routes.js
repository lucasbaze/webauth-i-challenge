const router = require('express').Router();
const Users = require('./auth-model');

router.get('/users', async (req, res) => {
    let users = await Users.getUsers();
    res.status(200).json(users);
});

router.post('/register', async (req, res, next) => {
    let user = req.body;

    let createdUser = await Users.addUser(user);
    res.status(200).json(createdUser);
});

//
//Middleware
function accountCreationRequirements(req, res, next) {
    let user = req.body;

    if (!user || !user.username || !user.password) {
        next('Missing Parameters');
    }

    switch (user.password) {
        case user.password.length < 5:
            next('Password must be 8 chars');
            break;
        default:
            next();
    }
}

module.exports = router;
