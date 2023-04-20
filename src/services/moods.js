const { isAuth } = require("../common/auth");
const { logger } = require("../common/log");

// postgresql сонгосон бол доорх мөрийн uncomment
const {
  getMoods,
  insertMood,
  updateMood,
  deleteMood,
} = require("../logic/moods");

module.exports = function (app, connection) {
  /**
   * GET - Жагсаалт авах, ямар нэг дата харахад ашиглана => app.get()
   * POST - Login, Create дээр ашиглана => app.post()
   * PUT - Update буюу дата засахад ашиглана => app.put()
   * DELETE - Устгахад ашиглана => app.delete()
   */

  // endpoints
  app.get("/api/moods", isAuth, async (req, res) => {
    try {
      logger.info(`${req.ip} /mood [get]`);

      getMoods(req, res, connection);
    } catch (err) {
      logger.error(`${req.ip} ${err}`);
      res.status(500).json({ error: err.message });
    }
  });

  app.post("/api/mood", isAuth, async (req, res) => {
    try {
      logger.info(`${req.ip} /mood [post]`);
      insertMood(req, res, connection);
    } catch (err) {
      logger.error(`${req.ip} ${err}`);
      res.status(500).json({ error: err.message });
    }
  });

  app.put("/api/mood", isAuth, async (req, res) => {
    try {
      logger.info(`${req.ip} /mood [put]`);
      updateMood(req, res, connection);
    } catch (err) {
      logger.error(`${req.ip} ${err}`);
      res.status(500).json({ error: err.message });
    }
  });

  app.delete("/api/mood", isAuth, async (req, res) => {
    try {
      logger.info(`${req.ip} /mood [delete]`);
      deleteMood(req, res, connection);
    } catch (err) {
      logger.error(`${req.ip} ${err}`);
      res.status(500).json({ error: err.message });
    }
  });
};
