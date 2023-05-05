// eniig shalgah heregtei
const { logger } = require("../common/log");

var natural = require("natural");
const req = require("express/lib/request");

//v
const getSuggests = async (request, response, pool) => {
  try {
    const { moods } = request.body;

    if (!moods) {
      response.status(400).json({ error: "moods not found!" });
    }

    console.log(moods);

    let genres = [];
    natural.BayesClassifier.load(
      "./src/model/movie_model.json",
      null,
      async function (err, model) {
        for (let i = 0; i < moods.length; i++) {
          let a = model.classify(moods[i]);
          genres = [...genres, ...a.split(",")];
        }

        const genrelist = await pool.query(
          `SELECT * FROM genres WHERE name IN (${genres
            .map((_, i) => "$" + (i + 1))
            .join(", ")})`,
          genres
        );

        const movies = await pool.query(
          `SELECT * FROM movies WHERE genre_id IN (${genrelist.rows
            .map((_, i) => "$" + (i + 1))
            .join(", ")})`,
          genrelist.rows.map((row) => row.id)
        );

        genrelist;
        return response.status(200).json({
          data: movies.rows,
          token: request.token,
        });
      }
    );
  } catch (error) {
    response.status(500).send({ error: error.message });
    logger.error(`${request.ip} ${error.message}`);
    return;
  }
};

//v
const insertSuggest = async (request, response, pool) => {
  try {
    const { genre_id, mood_id } = request.body;
    await pool.query(
      "INSERT INTO suggest (genre_id, mood_id) VALUES ($1, $2)",
      [genre_id, mood_id]
    );
    return response.status(200).json({
      message: "success",
      token: request.token,
    });
  } catch (error) {
    response.status(500).send({ error: error.message });
    logger.error(`${request.ip} ${error.message}`);
    return;
  }
};

const updateSuggest = async (request, response, pool) => {
  try {
    const { id, mood_id, genre_id } = request.body;
    await pool.query(
      "UPDATE suggest SET mood_id = COALESCE($1, mood_id), genre_id = COALESCE($2, genre_id) WHERE id = $3",
      [mood_id, genre_id, id]
    );
    return response.status(200).json({
      message: "success",
      token: request.token,
    });
  } catch (error) {
    response.status(500).send({ error: error.message });
    logger.error(`${request.ip} ${error.message}`);
    return;
  }
};

const deleteSuggest = async (request, response, pool) => {
  try {
    const { id } = request.body;
    console.log("id: ", id);
    await pool.query("DELETE FROM suggest WHERE id = $1", [id]);
    return response.status(200).json({
      message: "success",
      token: request.token,
    });
  } catch (error) {
    response.status(500).send({ error: error.message });
    logger.error(`${request.ip} ${error.message}`);
    return;
  }
};

module.exports = {
  getSuggests,
  insertSuggest,
  updateSuggest,
  deleteSuggest,
};
