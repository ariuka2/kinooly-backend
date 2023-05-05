const { isAuth } = require("../common/auth");
const { logger } = require("../common/log");

// postgresql сонгосон бол доорх мөрийн uncomment
const {
  getSuggests,
  insertSuggest,
  updateSuggest,
  deleteSuggest,
} = require("../logic/suggests");

module.exports = function (app, connection) {
  /**
   * GET - Жагсаалт авах, ямар нэг дата харахад ашиглана => app.get()
   * POST - Login, Create дээр ашиглана => app.post()
   * PUT - Update буюу дата засахад ашиглана => app.put()
   * DELETE - Устгахад ашиглана => app.delete()
   */

  // endpoints
  app.get("/api/suggests", isAuth, async (req, res) => {
    try {
      logger.info(`${req.ip} /suggest [get]`);

      getSuggests(req, res, connection);
    } catch (err) {
      logger.error(`${req.ip} ${err}`);
      res.status(500).json({ error: err.message });
    }
  });

  app.post("/api/suggest", isAuth, async (req, res) => {
    try {
      logger.info(`${req.ip} /suggest [post]`);
      insertSuggest(req, res, connection);
    } catch (err) {
      logger.error(`${req.ip} ${err}`);
      res.status(500).json({ error: err.message });
    }
  });

  app.put("/api/suggest", isAuth, async (req, res) => {
    try {
      logger.info(`${req.ip} /suggest [put]`);
      updateSuggest(req, res, connection);
    } catch (err) {
      logger.error(`${req.ip} ${err}`);
      res.status(500).json({ error: err.message });
    }
  });

  app.delete("/api/suggest", isAuth, async (req, res) => {
    try {
      logger.info(`${req.ip} /suggest [delete]`);
      deleteSuggest(req, res, connection);
    } catch (err) {
      logger.error(`${req.ip} ${err}`);
      res.status(500).json({ error: err.message });
    }
  });
};
