const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    req.user = jwt.verify(token, process.env.JWT_SECRET).user;

    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: 'Unauthorized' });
  }
};

module.exports = auth;
