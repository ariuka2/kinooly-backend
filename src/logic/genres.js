const { logger } = require("../common/log");
const { calcToken } = require("../common/auth");

// v
const getGenres = async (request, response, pool) => {
  try {
    const result = await pool.query("select * from genres ORDER BY NAME ASC");
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
const insertGenre = async (request, response, pool) => {
  try {
    const { name } = request.body;
    await pool.query("INSERT INTO Genres (name) VALUES ($1)", [name]);
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
const updateGenre = async (request, response, pool) => {
  try {
    const { id, name } = request.body;
    await pool.query("UPDATE genres SET name = $1 WHERE id = $2", [name, id]);
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
const deleteGenre = async (request, response, pool) => {
  try {
    const { id } = request.body;
    console.log("id: ", id);
    await pool.query("DELETE FROM movies_genres WHERE genre_id = $1", [id]);
    await pool.query("DELETE FROM suggest WHERE genre_id = $1", [id]);
    await pool.query("DELETE FROM genres WHERE id = $1", [id]);
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
  getGenres,
  insertGenre,
  updateGenre,
  deleteGenre,
};
