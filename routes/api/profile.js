const router = require("express").Router();
const profileController = require("../../controllers/profileController");

router.route("/:id")
  .put(profileController.updateSearches)
  .get(profileController.findUserSearch);

module.exports = router;
