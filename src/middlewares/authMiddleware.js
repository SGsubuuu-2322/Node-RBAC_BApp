const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  let token;
  let authHeader = req.headers.Authorization || req.headers.authorization;

  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        message: "Token not found, authorization denied...",
      });
    }

    try {
      //   console.log(req);
      const decodeUser = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decodeUser;
      console.log(
        `Token verified with user: ${JSON.stringify(decodeUser)}-------------`
      );
      next();
    } catch (err) {
      return res.status(400).json({
        message: "Token not valid, access denied...",
      });
    }
  } else {
    return res.status(401).json({
      message: "There is no authorization token in header. Access Denied...",
    });
  }
};

module.exports = verifyToken;
