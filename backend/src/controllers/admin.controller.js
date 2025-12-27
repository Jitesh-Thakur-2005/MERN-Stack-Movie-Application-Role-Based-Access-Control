const Movie = require("../models/Movie");

// ADD movie
exports.addMovie = async (req, res) => {
  const adminId = req.user.id; 
  let body=req.body;
  body.admin_id=adminId;
  const movie = await Movie.create(body);
  res.status(201).json(movie);
};

// UPDATE movie
exports.updateMovie = async (req, res) => {
  const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(movie);
};

// DELETE movie
exports.deleteMovie = async (req, res) => {
  await Movie.findByIdAndDelete(req.params.id);
  res.json({ message: "Movie deleted" });
};
