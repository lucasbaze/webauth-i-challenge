const express = require('express');

//
//middleware
require('dotenv').config();
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

//
//Route middleware
const authRoutes = require('./auth/auth-routes');

//
//Create App
const server = express();

//
//Use middleware
server.use(express.json());
server.use(helmet());
server.use(cors());
server.use(morgan('tiny'));

//
//Basic route
server.get('/', (req, res) => {
    res.send('Inside server!');
});

//
//Use middleware
server.use('/api/auth', authRoutes);

//
//error handler
server.use((err, req, res, next) => {
    res.status(500).json(err);
});

//
//PORT and listen
const PORT = process.env.PORT;
server.listen(PORT, () => console.log(`App listening on ${PORT}`));
