import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

import express from 'express';
import dotenv from 'dotenv';
import session from 'express-session';
import logger from './middleware/logger.js';
import userRoutes from './routes/user.js';
import storeRoutes from './routes/store.js';

dotenv.config();
const PORT = process.env.PORT || 3005;
const __filename = fileURLToPath(import.meta.url);
const PATH = dirname(__filename);

// Initialize express
const app = express();

// Set template engine
app.set('view engine', 'ejs');
app.set('views', path.join(PATH, 'views'));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session
app.use(
    session({
        secret: process.env.SECRET || 'your-secret-key',
        resave: false,
        saveUninitialized: true
    })
);

// Static folder
app.use(express.static(path.join(PATH, 'public')));

// Use logger middleware
app.use(logger);

// Routes
app.use('/', userRoutes);
app.use('/api/home', storeRoutes);

// Error handling for 404
app.use((req, res) => {
    res.status(404).render('404', {
        title: 'Page Not Found',
        message: 'Page not found'
    });
});

// Listen
app.listen(PORT, () => {
    console.log(`Server is listening on port: ${PORT}`);
});
