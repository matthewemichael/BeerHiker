const router = require("express").Router();
const profileController = require("../../controllers/profileController");

router.route("/:id")
  .get(profileController.findUserSearch)
  .put(profileController.updateMaps);

module.exports = router;
