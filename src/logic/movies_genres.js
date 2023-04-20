const { logger } = require("../common/log");
const { calcToken } = require("../common/auth");

//v
const getMovies_genres = async (request, response, pool) => {
  try {
    const result = await pool.query(
      "SELECT * FROM Movies_Genres ORDER BY created_date desc"
    );
    return response.status(200).json({
      data: result.rows,
      token: request.token,
    });
  } catch (error) {
    response.status(500).send({ error: error.message });
    logger.error(`${request.ip} ${error.message}`);
    return;
  }
};

//v
const insertMovies_genre = async (request, response, pool) => {
  try {
    const { movie_id, genre_id } = request.body;
    await pool.query(
      "INSERT INTO Movies_Genres (movie_id, genre_id) VALUES ($1, $2)",
      [movie_id, genre_id]
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

//v
const updateMovies_genre = async (request, response, pool) => {
  try {
    const { genre_id, movie_id, id } = request.body;
    await pool.query(
      "UPDATE Movies_genres SET genre_id = COALESCE($1, genre_id), movie_id = COALESCE($2, movie_id) WHERE id = $3",
      [genre_id, movie_id, id]
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

//v
const deleteMovies_genre = async (request, response, pool) => {
  try {
    const { id } = request.body;
    console.log("id: ", id);
    await pool.query("DELETE FROM movies_genres WHERE id = $1", [id]);
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
  getMovies_genres,
  insertMovies_genre,
  updateMovies_genre,
  deleteMovies_genre,
};
