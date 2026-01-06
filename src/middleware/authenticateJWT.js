import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey';

export const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.sendStatus(401); // 沒有 token

  const token = authHeader.split(' ')[1]; // Bearer <token>
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403); // token 無效
    req.user = user; // 可以在後續 route 使用 user 資訊
    next();
  });
};
