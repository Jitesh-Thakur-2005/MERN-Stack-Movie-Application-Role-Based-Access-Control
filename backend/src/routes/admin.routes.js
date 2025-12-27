const router = require("express").Router();
const auth = require("../middleware/auth.middleware");
const admin = require("../middleware/role.middleware");
const {
  addMovie,
  updateMovie,
  deleteMovie,
} = require("../controllers/admin.controller");

router.post("/", auth, admin, addMovie);
router.put("/:id", auth, admin, updateMovie);
router.delete("/:id", auth, admin, deleteMovie);

module.exports = router;
