const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  console.log(req.params);
  console.log(req.body);
  console.log(req.query);

  res.status(403);
  res.send({ success: true, message: "unauthorised access" });
});

router.get("/getData", (req, res) => {
  console.log(req.params);
  console.log(req.body);
  console.log(req.query);

  res.status(200);
  res.send({
    success: true,
    message: "userData",
    data: {
      name: "Nikhil",
      id: 101,
    },
  });
});

// router.post("/signup", (req, res) => {
// const { id } = req.body;
// res.send(`user created with ${id}`);
// });

router.all("/*", (req, res) => {
  res.status(404);
  res.send("Invalid path");
});

module.exports = router;
