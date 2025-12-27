const axios = require("axios");
const cheerio = require("cheerio");

const IMDB_URL = "https://www.imdb.com/chart/top/";

async function fetchIMDbTop250() {
  const { data } = await axios.get(IMDB_URL, {
    headers: { "User-Agent": "Mozilla/5.0" },
  });

  const $ = cheerio.load(data);
  const movies = [];

  $(".ipc-metadata-list-summary-item").each((_, el) => {
    movies.push({
      title: $(el).find("h3").text().replace(/^\d+\.\s*/, ""),
      rating: parseFloat($(el).find(".ipc-rating-star--rating").text()),
      imdbUrl:
        "https://www.imdb.com" + $(el).find("a").attr("href"),
    });
  });

  return movies;
}

module.exports = fetchIMDbTop250;
