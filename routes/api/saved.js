const router = require("express").Router();
const profileController = require("../../controllers/profileController");



router.route("/:id")
  .get(profileController.findUserSearch)
  .put(profileController.updateSaved);

module.exports = router;
