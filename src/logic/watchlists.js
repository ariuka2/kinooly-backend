const { logger } = require("../common/log");
const { calcToken } = require("../common/auth");

// v
const getWatchlists = async (request, response, pool) => {
  try {
    const result = await pool.query("SELECT * FROM watchlist");
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

// v
const insertWatchlist = async (request, response, pool) => {
  try {
    const { movie_id, user_id } = request.body;
    await pool.query(
      "INSERT INTO watchlist (movie_id, user_id) VALUES ($1, $2)",
      [movie_id, user_id]
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

//x
const updateWatchlist = async (request, response, pool) => {
  try {
    const { id, movie_id, user_id } = request.body;
    await pool.query(
      "UPDATE watchlist SET movie_id = COALESCE($1, movie_id), user_id = COALESCE($2, user_id) WHERE id = $3",
      [id, movie_id, user_id]
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
const deleteWatchlist = async (request, response, pool) => {
  try {
    const { id } = request.body;
    console.log("id: ", id);
    await pool.query("DELETE FROM watchlist WHERE id = $1", [id]);
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
  getWatchlists,
  insertWatchlist,
  updateWatchlist,
  deleteWatchlist,
};
