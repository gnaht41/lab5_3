require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');

// Routes
const { authRoutes, productRoutes, supplierRoutes } = require('./routes');

// Models
const Product = require('./models/Product');
const Supplier = require('./models/Supplier');

// Session config
const sessionConfig = require('./config/session');

const app = express();

// Views & Static
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));

// Middleware
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// Session
app.use(sessionConfig(process.env.MONGO_URI));

// Local variables accessible in EJS
app.use((req, res, next) => {
    res.locals.user = req.session.user || null;
    next();
});

// Trang chủ với tìm kiếm và lọc sản phẩm (bất kỳ ai cũng xem được)
app.get('/', async (req, res) => {
    try {
        const { supplier, search } = req.query;

        const suppliers = await Supplier.find();

        let filter = {};
        if (supplier) filter.supplierId = supplier;
        if (search) filter.name = { $regex: search, $options: 'i' };

        const products = await Product.find(filter).populate('supplierId');

        res.render('index', {
            suppliers,
            products,
            selectedSupplier: supplier || '',
            searchQuery: search || '',
            user: req.session.user || null
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Routes
app.use('/auth', authRoutes);
app.use('/suppliers', supplierRoutes);
app.use('/products', productRoutes);

// Connect MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection failed:', err));

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}/`));
