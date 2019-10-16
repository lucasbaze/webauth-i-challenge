const express = require('express');

//
//middleware
require('dotenv').config();
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const session = require('express-session');

//
//Configs
const sessionConfig = {
    name: 'session',
    secret: process.env.SESSION_SECRET,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 30,
        secure: false,
        httpOnly: true,
    },
    resave: false,
    saveUninitialized: true,
};

//
//Route middleware
const authRoutes = require('./auth/auth-routes').router;
const restrictedRoutes = require('./restricted');
const restricted = require('./auth/auth-routes').restricted;

//
//Create App
const server = express();

//
//Use middleware
server.use(express.json());
server.use(helmet());
server.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}));
server.use(morgan('tiny'));
server.use(session(sessionConfig));

//
//Basic route
server.get('/', (req, res) => {
    res.send('Inside server!');
});

//
//Use middleware
server.use('/api/restricted', restricted, restrictedRoutes);
server.use('/api', authRoutes);

//
//error handler
server.use((err, req, res, next) => {
    console.log(err);
    res.status(err.status).json(err.message);
});

//
//PORT and listen
const PORT = process.env.PORT;
server.listen(PORT, () => console.log(`App listening on ${PORT}`));
