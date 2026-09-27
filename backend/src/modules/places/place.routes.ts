import { Router } from 'express';

import * as placeController from './place.controller.js';

const router = Router();

router.get('/places/search', placeController.searchPlace);

export default router;
