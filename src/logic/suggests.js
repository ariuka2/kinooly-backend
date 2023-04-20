// eniig shalgah heregtei
const { logger } = require("../common/log");
const { calcToken } = require("../common/auth");

//v
const getSuggests = async (request, response, pool) => {
  try {
    const result = await pool.query(
      "SELECT * FROM suggest ORDER BY created_date desc"
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
    await pool.query("UPDATE suggest SET mood_id = COALESCE($1, mood_id), genre_id = COALESCE($2, genre_id) WHERE id = $3", [id,  mood_id, genre_id]);
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
