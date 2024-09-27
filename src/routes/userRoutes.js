const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/authMiddleware");
const authorizeRoles = require("../middlewares/roleMiddleware");

// Admin can access...

router.get("/admin", verifyToken, authorizeRoles("admin"), (req, res) => {
  return res.status(200).json({
    message: "Welcome admin to your profile...",
  });
});

// Both Admin and Manager can access...

router.get(
  "/manager",
  verifyToken,
  authorizeRoles("admin", "manager"),
  (req, res) => {
    return res.status(200).json({
      message: "Welcome manager to your profile...",
    });
  }
);

// All Admin, Manager and, Users can access...

router.get(
  "/user",
  verifyToken,
  authorizeRoles("admin", "manager", "user"),
  (req, res) => {
    return res.status(200).json({
      message: "Welcome user to your profile...",
    });
  }
);

module.exports = router;
