/**
 * LabUsa Web Api Server
 */
 const routes = require("express").Router();
 const bcrypt = require("bcryptjs");
 const jwt = require("jsonwebtoken");
 const db = require("../db");
 const {secure} = require("../connect/auth")

 routes.get("/", secure, (req, res)=>{
  res.send(req.user)
 });

 module.exports = routes;