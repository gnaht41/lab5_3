const Product = require('../models/Product');
const Supplier = require('../models/Supplier');

exports.getAll = async (req, res) => {
    try {
        const { supplier, search } = req.query;
        let filter = {};
        if (supplier) filter.supplierId = supplier;
        if (search) filter.name = { $regex: search, $options: 'i' };

        const products = await Product.find(filter).populate('supplierId');
        const suppliers = await Supplier.find();
        res.render('products/index', { products, suppliers, selectedSupplier: supplier || '', searchQuery: search || '', user: req.session.user || null });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

exports.showCreate = async (req, res) => {
    const suppliers = await Supplier.find();
    res.render('products/create', { suppliers });
};

exports.create = async (req, res) => {
    try {
        await Product.create(req.body); // req.body gồm name, price, quantity, supplierId
        res.redirect('/products');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};
// Hiển thị form chỉnh sửa sản phẩm
exports.showEdit = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        const suppliers = await Supplier.find();
        res.render('products/edit', { product, suppliers });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

// Xử lý cập nhật sản phẩm
exports.update = async (req, res) => {
    try {
        await Product.findByIdAndUpdate(req.params.id, req.body);
        res.redirect('/products');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

// Xử lý xóa sản phẩm
exports.delete = async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.redirect('/products');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};
