const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const { blogs } = require("../database/connection");

exports.isAuthenticated = async (req, res, next) => {
  const token = req.cookies.jwtToken;
  if (!token || token === null || token === undefined) {
    return res.status(400).json({
      message: "please login",
    });
  }
  const decryptedResult = await promisify(jwt.verify)(
    token,
    process.env.SECRET_KEY
  );
  const data = blogs.findByPk(decryptedResult.id);
  if (!data) {
    res.status(400).json({
      message: "No user belonging with that id",
    });
  }
  req.userId = decryptedResult.id;
  next();
};
