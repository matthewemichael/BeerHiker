const router = require("express").Router();
const userRoutes = require("./users");
const profileRoutes = require("./profile");
const mapRoutes = require("./maps");
const savedRoutes = require("./saved");

// Book routes
router.use("/users", userRoutes);
router.use("/searches", profileRoutes);
router.use("/maps", mapRoutes);
router.use("/saved", savedRoutes);

module.exports = router;
