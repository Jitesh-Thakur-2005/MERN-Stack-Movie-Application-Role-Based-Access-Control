const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema(
  {

    title: { type: String, required: true },
    poster: String,
    year:Number,
    type: String,
    admin_id:{type:String,require:true}
  },
  { timestamps: true }
);

module.exports = mongoose.model("Movie", movieSchema);
