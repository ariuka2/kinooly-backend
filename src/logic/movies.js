const { logger } = require("../common/log");
const { calcToken } = require("../common/auth");

//v
const getMovies = async (request, response, pool) => {
  try {
    const result = await pool.query("SELECT * FROM movies");
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
const insertMovie = async (request, response, pool) => {
  try {
    const {
      name,
      released_date,
      age_limit,
      duration,
      imdb,
      description,
      casts,
    } = request.body;
    await pool.query(
      "INSERT INTO movies (name, released_date, age_limit, duration, imdb, description, casts ) VALUES ($1, $2, $3, $4, $5, $6, $7)",
      [name, released_date, age_limit, duration, imdb, description, casts]
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
const updateMovie = async (request, response, pool) => {
  try {
    const {
      name,
      released_date,
      age_limit,
      duration,
      imdb,
      description,
      casts,
      id,
    } = request.body;
    await pool.query(
      "UPDATE movies SET name = COALESCE($1, name), released_date = COALESCE($2, released_date), age_limit = COALESCE($3, age_limit), duration = COALESCE($4, duration), imdb = COALESCE($5, imdb), description = COALESCE($6, description), casts = COALESCE($7, casts)   WHERE id = $8 ",
      [name, released_date, age_limit, duration, imdb, description, casts, id]
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

const deleteMovie = async (request, response, pool) => {
  try {
    const { id } = request.body;
    console.log("id: ", id);
    await pool.query("DELETE FROM movies_genres WHERE movie_id = $1", [id]);
    await pool.query("DELETE FROM actions WHERE movie_id = $1", [id]);
    await pool.query("DELETE FROM watchlist WHERE movie_id = $1", [id]);
    await pool.query("DELETE FROM movies WHERE id = $1", [id]);
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
  getMovies,
  insertMovie,
  updateMovie,
  deleteMovie,
};
