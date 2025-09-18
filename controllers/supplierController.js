const Supplier = require('../models/Supplier');

// Hiển thị danh sách suppliers
exports.getAll = async (req, res) => {
    try {
        const suppliers = await Supplier.find();
        res.render('suppliers/index', { suppliers });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

// Hiển thị form tạo supplier mới
exports.showCreate = (req, res) => {
    res.render('suppliers/create');
};

// Xử lý tạo supplier mới
exports.create = async (req, res) => {
    try {
        await Supplier.create(req.body);
        res.redirect('/suppliers');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

// Hiển thị form chỉnh sửa supplier
exports.showEdit = async (req, res) => {
    try {
        const supplier = await Supplier.findById(req.params.id);
        res.render('suppliers/edit', { supplier });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

// Xử lý cập nhật supplier
exports.update = async (req, res) => {
    try {
        await Supplier.findByIdAndUpdate(req.params.id, req.body);
        res.redirect('/suppliers');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

// Xử lý xóa supplier
exports.delete = async (req, res) => {
    try {
        await Supplier.findByIdAndDelete(req.params.id);
        res.redirect('/suppliers');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};
