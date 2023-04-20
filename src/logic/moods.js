// ene ajillahgui bj magadgu

const { logger } = require("../common/log");
const { calcToken } = require("../common/auth");

// v
const getMoods = async (request, response, pool) => {
  try {
    const result = await pool.query("SELECT * FROM moods");
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
const insertMood = async (request, response, pool) => {
  try {
    const { name } = request.body;
    await pool.query("INSERT INTO moods (name) VALUES ($1)", [name]);
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

// v
const updateMood = async (request, response, pool) => {
  try {
    const { name, id } = request.body;
    await pool.query("UPDATE moods SET name = $1 WHERE id = $2", [name, id]);
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
const deleteMood = async (request, response, pool) => {
  try {
    const { id } = request.body;
    console.log("id: ", id);
    await pool.query("DELETE FROM suggest WHERE mood_id = $1", [id]);
    await pool.query("DELETE FROM moods WHERE id = $1", [id]);
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
  getMoods,
  insertMood,
  updateMood,
  deleteMood,
};
