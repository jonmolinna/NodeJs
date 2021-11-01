import { Router } from 'express';
const router = Router();

import * as products from '../controllers/products.controller.js';
import { authJwt } from '../middlewares/index.js';

router.post('/', [authJwt.verifyToken, authJwt.isModerator], products.createProduct);
router.get('/', products.getProducts);
router.get('/:productId', products.getProductById);
router.put('/:productId', [authJwt.verifyToken, authJwt.isAdmin], products.updateProductById);
router.delete('/:productId', [authJwt.verifyToken, authJwt.isAdmin], products.deleteProductById);

export default router;