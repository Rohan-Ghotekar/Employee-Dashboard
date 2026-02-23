const express = require("express");
const router = express.Router();
const { validateUser } = require("../service/loginSerivce");

router.post("/", async (req, res) => {
  const { username, password } = req.body;

  const result = await validateUser(username, password);
  res.json(result);
});

module.exports = router;