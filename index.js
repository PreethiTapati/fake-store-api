import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

import express from 'express';
import dotenv from 'dotenv';
import session from "express-session";

import logger from './middleware/logger.js';
import userRoutes from './routes/user.js';
//import storeRoutes from './routes/store.js'

dotenv.config();
const PORT = process.env.PORT || 3005;

const __filename = fileURLToPath(import.meta.url);
const PATH = dirname(__filename);

//initialize express
const app = express();

// set template engine
app.set('view engine', 'ejs');
app.set('views', path.join(PATH, 'views'));

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//session
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true
}))


//static folder
app.use(express.static(path.join(PATH, 'public')));

// use logger
app.use(logger);

// Routes
app.use( userRoutes);
//app.use('/api/home', storeRoutes);



//handle 404
app.use('*', (req, res) => {
    res.status(404).render('404', {
        title: 'Page Not Found',
        message: 'Page not found'
    });
});

//listen
app.listen(PORT, () => {
    console.log(`Server is listening on port: ${PORT}`);
});
