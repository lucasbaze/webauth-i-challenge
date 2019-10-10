const router = require('express').Router();
const Users = require('./auth-model');

router.get('/users', async (req, res) => {
    let users = await Users.getUsers();
    res.status(200).json(users);
});

router.post(
    '/register',
    registerReqs,
    takenUsername,
    async (req, res, next) => {
        let user = req.body;

        let createdUser = await Users.addUser(user);
        res.status(200).json(createdUser);
    }
);

router.post('/login', async (req, res, next) => {
    let user = req.body;
    let loggedIn = await Users.login(user);
    if (loggedIn) {
        res.status(200).json({ message: 'Youre logged in' });
    } else {
        next(
            'You shall not pass! Unauthorized, username or password incorrect'
        );
    }
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

async function takenUsername(req, res, next) {
    let user = req.body;

    let username = await Users.checkUsername(user.username);
    if (username) {
        next('Username is already taken');
    }
    next();
}

module.exports = router;
