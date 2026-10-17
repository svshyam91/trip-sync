import { Router } from 'express';

import * as authController from './auth.controller.js';

const router = Router();

router.post('/auth/guest', authController.guestLogin);

export default router;
