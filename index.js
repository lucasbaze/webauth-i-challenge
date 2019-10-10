const express = require('express');

//
//middleware
require('dotenv').config();
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

//
//Create App
const server = express();

//
//Use middleware
server.use(helmet());
server.use(cors());
server.use(morgan('compact'));

//
//Basic route
server.get('/', (req, res) => {
    res.send('Inside server!');
});

//
//PORT and listen
const PORT = process.env.PORT;
server.listen(PORT, () => console.log(`App listening on ${PORT}`));
