import { Router } from 'express';
const router = Router();

import * as auth from '../controllers/auth.controller.js';
import { validator } from '../middlewares/index.js';

router.post('/register', [validator.checkUsernameOrEmail, validator.checkRolesExisted], auth.register);
router.post('/login', auth.login);

export default router