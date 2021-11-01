import Product from '../models/Products.js';

export const createProduct = async (req, res) => {
    const { name, category, price, imgURL } = req.body
    const producto = new Product({ name, category, price, imgURL });
    const product = await producto.save();
    res.status(201).json(product);
};

export const getProducts = async (req, res) => {
    const products = await Product.find();
    res.json(products);
};

export const getProductById = async (req, res) => {
    const product = await Product.findById(req.params.productId);
    res.status(200).json(product)
};

export const updateProductById = async (req, res) => {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.productId, req.body, { new: true });
    res.status(204).json(updatedProduct);
};

export const deleteProductById = async (req, res) => {
    const { productId } = req.params;
    await Product.findByIdAndDelete(productId);
    res.status(204).json({ "msg": "Product Deletedd"})
};