const express = require("express");
const router = express.Router();

// Admin can access...

router.get("/admin", (req, res) => {
  return res.status(200).json({
    message: "Welcome admin to your profile...",
  });
});

// Both Admin and Manager can access...

router.get("/manager", (req, res) => {
  return res.status(200).json({
    message: "Welcome manager to your profile...",
  });
});

// All Admin, Manager and, Users can access...

router.get("/user", (req, res) => {
  return res.status(200).json({
    message: "Welcome user to your profile...",
  });
});

module.exports = router;
