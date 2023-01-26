const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();

const generateToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "48h",
    }
  );
};

const isAuth = (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    const onlyToken = token.slice(7, token.length);
    jwt.verify(onlyToken, process.env.JWT_SECRET, (err, decode) => {
      if (err) {
        return res.status(401).send({ message: "Invalid Token" });
      }
      req.user = decode;
      next();
      return;
    });
  } else {
    return res.status(401).send({ message: "Token is not supplied." });
  }
};

const isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    return next();
  }
  return res.status(401).send({ message: "Admin Token is not valid." });
};

const isValid = (req, res, next) => {
  if (req.user && req.user.isAdmin || req.user.isEmployer) {
    return next();
  }
  return res.status(401).send({ message: "Admin Token is not valid." });
};
const isEmployer = (req, res, next) => {
  if (req.user && req.user.isEmployer) {
    return next();
  }
  return res.status(401).send({ message: "Employer Token is not valid." });
};

module.exports = { generateToken, isAuth, isAdmin, isValid, isEmployer};
