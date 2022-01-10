/**
 * LabUsa Web Api Server
 */
const routes = require("express").Router();
const bcrypt = require("bcryptjs");
const { registerValidation, loginValidation } = require("../validation/auth");
const db = require("../db");
const { createAccessToken } = require("../connect/auth");

routes.post("/register", async (req, res) => {
  // validate input
  const { error } = registerValidation(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const { fname, lname, username, password } = req.body;

  // check user already exist
  const count = await db.query(
    `SELECT COUNT(1) FROM public."User" WHERE uname = $1`,
    [username]
  );
  if (count.rows.length > 0 && parseInt(count.rows[0].count) > 0) {
    return res.status(400).send(`User with username ${username} already exist`);
  }

  // hash password
  const salt = await bcrypt.genSalt(18);
  const hashPassword = await bcrypt.hash(password, salt);

  // create user
  try {
    const rst = await db.query(
      /*sql*/ `INSERT INTO public."User" (fname, lname, uname, hash) 
      VALUES ($1, $2, $3, $4) RETURNING id`,
      [fname, lname, username, hashPassword]
    );

    res.status.send({ success: true, payload: rst.rows[0] });
  } catch (error) {
    // log error in actual
    res.status(503).send(error);
  }
});

routes.post("/login", async (req, res) => {
  // validate input
  const { error } = loginValidation(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const { username, password } = req.body;

  // check login
  try {
    const rst = await db.query(
      /*sql*/ `SELECT id, uname, hash 
      FROM public."User" 
      WHERE uname = $1`,
      [username]
    );

    if (rst.rows.length == 0) {
      return res.status(404).send(`Username ${username} not found!`);
    }

    const { id, uname, hash } = rst.rows[0];
    const compare = await bcrypt.compare(password, hash);
    if (!compare) {
      return res
        .status(404)
        .send(`Username ${username} and password combo does not exist`);
    }

    const token = createAccessToken(id, uname);
    res.send(token);
  } catch (error) {
    // log error in actual
    res.status(503).send(error);
  }
});

module.exports = routes;
