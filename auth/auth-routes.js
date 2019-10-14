const router = require('express').Router();
const Users = require('./auth-model');

router.get('/users', restricted, async (req, res) => {
    let users = await Users.getUsers();
    res.status(200).json(users);
});

router.post(
    '/register',
    registerReqs,
    takenUsername,
    async (req, res, next) => {
        let user = req.body;
        req.session.user = user;
        let createdUser = await Users.addUser(user);
        res.status(200).json(createdUser);
    }
);

router.post('/login', async (req, res, next) => {
    let user = req.body;
    let loggedIn = await Users.login(user);
    if (loggedIn) {
        req.session.user = user;
        res.status(200).json({ message: 'Youre logged in' });
    } else {
        next({
            status: 401,
            message:
                'You shall not pass! Unauthorized, username or password incorrect',
        });
    }
});

router.get('/logout', async (req, res, next) => {
    if (req.session) {
        try {
            let destroyed = await req.session.destroy();
            res.status(200).json({
                message: 'Successfully logged out. Thanks for playing!',
            });
        } catch (e) {
            res.status(400).json('Failed to logout. Please try again.');
        }
    } else {
        res.status(200).json({ message: 'You were never here to begin with.' });
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

async function restricted(req, res, next) {
    if (req.session && req.session.user) {
        next();
    } else {
        next({
            status: 401,
            message: 'Not logged in. Please do so',
        });
    }
}

module.exports = router;
