/**
 * LabUsa Web Api Server
 */
const { verify, sign } = require("jsonwebtoken");

const secure = (req, res, next) => {
  const authorization = req.headers["authorization"]

  if (!authorization) {
    return res.status(401).send("Access Denied");
  }
  try {
    const token = authorization.split(' ')[1];
    const verified = verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = verified;

    next();
  } catch (error) {
    res.status(400).send("Invalid Token");
  }
};

const createAccessToken = (id, email) =>
  sign({ id, email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15m" });

const createRefreshToken = (id, email) =>
  sign({ id, email }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "7d" });

module.exports = { secure, createAccessToken, createRefreshToken };
