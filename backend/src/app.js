const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));


app.use("/api/movies", require("./routes/movie.routes"));
app.use("/api/admin/movies", require("./routes/admin.routes"));
app.use("/api/auth", require("./routes/auth.routes"));

module.exports = app;
