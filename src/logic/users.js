const { logger } = require("../common/log");
const { calcToken } = require("../common/auth");

const login = async (request, response, pool) => {
  try {
    const { email, password } = request.body;

    const result = await pool.query(
      "SELECT * FROM users WHERE email = $1 and password = $2",
      [email, password]
    );

    if (result.rows.length == 0) {
      return response
        .status(401)
        .json({ error: "username or password is incorrect!" });
    }
    const token = calcToken({ email });

    return response.status(200).json({
      data: result.rows[0],
      token,
    });
  } catch (error) {
    response.status(500).send({ error: error.message });
    logger.error(`${request.ip} ${error.message}`);
    return;
  }
};

// v
const getUsers = async (request, response, pool) => {
  try {
    const result = await pool.query(
      "SELECT * FROM users ORDER BY created_date desc"
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

// v
const insertUser = async (request, response, pool) => {
  try {
    const { password, firstname, lastname, email } = request.body;
    await pool.query(
      "INSERT INTO users (password, firstname,lastname, email) VALUES ($1, $2, $3, $4)",
      [password, firstname, lastname, email]
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
const updateUser = async (request, response, pool) => {
  try {
    const { password, firstname, lastname, email, id } = request.body;
    await pool.query(
      "UPDATE users SET password = COALESCE($1,password), firstname = COALESCE($2, firstname), lastname = COALESCE($3, lastname), email = COALESCE($4, email) WHERE id = $5",
      [password, firstname, lastname, email, id]
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

// v
const deleteUser = async (request, response, pool) => {
  try {
    const { id } = request.body;
    console.log("id: ", id);
    await pool.query("DELETE FROM actions WHERE user_id = $1", [id]);
    await pool.query("DELETE FROM watchlist WHERE user_id = $1", [id]);
    await pool.query("DELETE FROM users WHERE id = $1", [id]);
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
  getUsers,
  insertUser,
  updateUser,
  deleteUser,
  login,
};
