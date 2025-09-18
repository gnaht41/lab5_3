// controllers/authController.js
const User = require('../models/User');

exports.showRegister = (req, res) => res.render('auth/register', { message: null });
exports.showLogin = (req, res) => res.render('auth/login', { message: null });
exports.showForgot = (req, res) => res.render('auth/forgot', { message: null });


exports.register = async (req, res) => {
    const { username, password, email, phone } = req.body;
    try {
        // Chỉ kiểm tra username đã tồn tại
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.render('auth/register', { message: 'Username already exists' });
        }

        const user = await User.create({ username, password, email, phone });
        req.session.user = { id: user._id, username: user.username };
        res.render('auth/login');
    } catch (err) {
        console.error(err);
        res.render('auth/register', { message: 'Error registering user. Please try again.' });
    }
};


exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user) {
            return res.render('auth/login', { message: 'Invalid username or password' });
        }

        const match = await user.comparePassword(password);
        if (!match) {
            return res.render('auth/login', { message: 'Invalid username or password' });
        }

        // Nếu đăng nhập thành công
        req.session.user = { id: user._id, username: user.username };
        res.redirect('/');
    } catch (err) {
        console.error(err);
        res.render('auth/login', { message: 'Error logging in. Please try again.' });
    }
};


exports.logout = (req, res) => {
    req.session.destroy(err => {
        if (err) console.error(err);
        res.clearCookie('connect.sid');
        res.redirect('/');
    });
};
