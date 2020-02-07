const router = require("express").Router();
const profileController = require("../../controllers/profileController");



router.route("/:id")
  .put(profileController.remove);

module.exports = router;
