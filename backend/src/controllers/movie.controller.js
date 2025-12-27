const Movie = require("../models/Movie");
const axios = require("axios");

// GET all movies with search & sort
exports.getMovies = async (req, res) => {
  try {
    const { search, sortBy = "movie", order = "asc" } = req.query;

    let omdbMovies = [];
    
    if (search) {
      console.log(  `http://www.omdbapi.com/?apikey=d8c6969f&s=${search}&type=${sortBy}`)
      const omdbRes = await axios.get(
        `http://www.omdbapi.com/?apikey=d8c6969f&s=${search}&type=${sortBy}`
      );
console.log(omdbRes);
      if (omdbRes.data.Response === "True") {
        
        omdbMovies = omdbRes.data.Search.map((m) => ({
          title: m.Title,
          year: m.Year,
          imdbID: m.imdbID,
          type: m.Type,
          poster: m.Poster,
        }));
      }
    }

    // MongoDB search query
    const query = {};
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    const sortOrder = order === "desc" ? -1 : 1;

    // Find in MongoDB and sort
    const dbMovies = await Movie.find(query).sort({ [sortBy]: sortOrder });

    // Combine OMDb + DB movies
    let combined = [...omdbMovies, ...dbMovies];

    // Optional: sort combined array by title/year if needed
    if (sortBy === "title") {
      combined.sort((a, b) => 
        order === "desc" 
          ? b.title.localeCompare(a.title) 
          : a.title.localeCompare(b.title)
      );
    } else if (sortBy === "year") {
      combined.sort((a, b) => 
        order === "desc" 
          ? Number(b.year) - Number(a.year) 
          : Number(a.year) - Number(b.year)
      );
    }

    res.json(combined);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
  }
};

// GET single movie
exports.getMovieById = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).json({ error: "Movie not found" });
    res.json(movie);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
  }
};
// GET admin movies
exports.getadminMovie = async (req, res) => {
  try {
    const adminId = req.user.id; 

    const movies = await Movie.find({ admin_id: adminId });

    if (movies.length === 0) {
      return res.status(404).json({ message: "No movies found" });
    }

    res.status(200).json(movies);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

