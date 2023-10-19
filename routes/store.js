import express from 'express';

import storeControllers from '../controllers/store.js';

const router = express.Router();

router.get('/', storeControllers.home);
//router.post('/sign-up', storeControllers.signUp);
//router.post('/login', storeControllers.logIn);

export default router;
