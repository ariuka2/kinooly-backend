const { logger } = require("../common/log");
const { calcToken } = require("../common/auth");

//v
const getActions = async (request, response, pool) => {
  try {
    const result = await pool.query(
      "SELECT * FROM actions ORDER BY created_date desc"
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
const insertAction = async (request, response, pool) => {
  try {
    const { liked, movie_id, user_id } = request.body;
    await pool.query(
      "INSERT INTO actions (liked, movie_id, user_id) VALUES ($1, $2, $3)",
      [liked, movie_id, user_id]
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

// x
const updateAction = async (request, response, pool) => {
  try {
    const { id, liked, movie_id, user_id } = request.body;
    await pool.query("UPDATE actions SET liked = COALESCE($1, liked), movie_id = COALESCE($2, movie_id), user_id = COALESCE($3, user_id) WHERE id = $4", [
      id,
      liked,
      movie_id, 
      user_id 
    ]);
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
const deleteAction = async (request, response, pool) => {
  try {
    const { id } = request.body;
    console.log("id: ", id);
    await pool.query("DELETE FROM actions WHERE id = $1", [id]);
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
  getActions,
  insertAction,
  updateAction,
  deleteAction,
};
