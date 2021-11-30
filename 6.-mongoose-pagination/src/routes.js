import { Router } from 'express';
import Product from './Product.js';
const router = Router();

router.get('/products', async (req, res) => {
    const limit = parseInt(req.query.limit, 10) || 5;
    const page = parseInt(req.query.page, 10) || 1;
    const products = await Product.paginate({}, { limit, page });
    res.json({ productos: products });
});

router.post('/products', async (req, res) => {
    const newProduct = new Product(req.body)
    const product = await newProduct.save();
    res.json({ producto: product});
});

export default router;

// http://localhost:9000/products?limit=5&page=1