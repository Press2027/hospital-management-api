const router = require("express").Router();

router.use("/patients", require("./patients"));
router.use("/appointments", require("./appointments"));

router.get("/", (req, res) => {
  res.json({
    message: "Hospital Management API",
    docs: "/api-docs"
  });
});

module.exports = router;