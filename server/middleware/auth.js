const jwt = require("jsonwebtoken");

exports.auth = (req, res, next) => {
  try {
    const token = req.signedCookies[process.env.COOKIES_NAME];
    if (!token) return res.status(401).json({ errorMessage: "Unauthorized" });

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;

    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ errorMessage: "Unauthorized" });
  }
};
