// middleware/auth.js

// Middleware kiểm tra người dùng đã đăng nhập
exports.isAuthenticated = (req, res, next) => {
    if (req.session.user) {
        // User đã login, cho phép đi tiếp
        return next();
    }
    // Nếu chưa login, redirect về trang login
    res.redirect('/auth/login');
};

// Middleware kiểm tra user chưa login (dùng cho login/register)
exports.isGuest = (req, res, next) => {
    if (!req.session.user) {
        return next();
    }
    // Nếu đã login, redirect về homepage
    res.redirect('/');
};
