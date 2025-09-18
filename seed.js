// seed.js
require('dotenv').config();
const mongoose = require('mongoose');
const Supplier = require('./models/Supplier');
const Product = require('./models/Product');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/mycrudapp';

async function seed() {
    try {
        await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('MongoDB connected');

        // Xóa dữ liệu cũ
        await Supplier.deleteMany();
        await Product.deleteMany();
        console.log('Old data removed');

        // Tạo suppliers
        const suppliers = await Supplier.insertMany([
            { name: 'Supplier A', address: '123 Street', phone: '0123456789' },
            { name: 'Supplier B', address: '456 Avenue', phone: '0987654321' },
            { name: 'Supplier C', address: '789 Boulevard', phone: '0112233445' }
        ]);
        console.log('Suppliers created');

        // Tạo products
        const products = [
            { name: 'Product 1', price: 100, quantity: 50, supplierId: suppliers[0]._id },
            { name: 'Product 2', price: 200, quantity: 30, supplierId: suppliers[0]._id },
            { name: 'Product 3', price: 150, quantity: 20, supplierId: suppliers[1]._id },
            { name: 'Product 4', price: 300, quantity: 10, supplierId: suppliers[2]._id }
        ];

        await Product.insertMany(products);
        console.log('Products created');

        console.log('Seeding completed');
        mongoose.connection.close();
    } catch (err) {
        console.error(err);
        mongoose.connection.close();
    }
}

seed();
