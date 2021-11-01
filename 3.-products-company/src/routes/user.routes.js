import { Router } from 'express';
const router = Router();

import * as user from '../controllers/user.controller.js';
import { authJwt, validator } from '../middlewares/index.js';

router.post('/', [
    authJwt.verifyToken,
    authJwt.isAdmin,
    validator.checkRolesExisted
], user.createUser);

export default router;