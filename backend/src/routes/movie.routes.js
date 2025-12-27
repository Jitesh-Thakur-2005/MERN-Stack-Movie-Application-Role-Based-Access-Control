const router = require("express").Router();
const auth = require("../middleware/auth.middleware");
const admin = require("../middleware/role.middleware");
const { getMovies, getMovieById, getadminMovie } = require("../controllers/movie.controller");
router.get("/list", auth, admin, getadminMovie)
router.get("/", getMovies);
router.get("/:id", getMovieById);

module.exports = router;
