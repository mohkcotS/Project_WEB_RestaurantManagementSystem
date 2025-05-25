const { verify } = require('jsonwebtoken');
require('dotenv').config();


const validateToken = (req, res, next) => {
    const accessToken = req.header("Authorization")?.split(" ")[1]; // Lấy token từ header

    if (!accessToken) return res.status(401).json({ error: "User not logged in" });

    try {
        const validToken = verify(accessToken, process.env.DEV_SECRETJWT);
        
        req.user = validToken; // Lưu thông tin user để sử dụng trong các API khác

        next(); // Cho phép request tiếp tục
    } catch (error) {
        return res.status(403).json({ error: "Invalid token" });
    }
};

// Middleware kiểm tra quyền (ví dụ: chỉ admin mới được truy cập)
const checkRole = (roles) => (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
        return res.status(403).json({ error: "Unauthorized access" });
    }
    next();
};

module.exports = { validateToken, checkRole };
