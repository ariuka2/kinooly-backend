const { isAuth } = require("../common/auth");
const { logger } = require("../common/log");

// postgresql сонгосон бол доорх мөрийн uncomment
const {
  getGenres,
  insertGenre,
  updateGenre,
  deleteGenre,
} = require("../logic/genres");


module.exports = function (app, connection) {
  /**
   * GET - Жагсаалт авах, ямар нэг дата харахад ашиглана => app.get()
   * POST - Login, Create дээр ашиглана => app.post()
   * PUT - Update буюу дата засахад ашиглана => app.put()
   * DELETE - Устгахад ашиглана => app.delete()
   */

  // endpoints
  app.get("/api/genres", isAuth, async (req, res) => {
    try {
      logger.info(`${req.ip} /genres [get]`);

      getGenres(req, res, connection);
    } catch (err) {
      logger.error(`${req.ip} ${err}`);
      res.status(500).json({ error: err.message });
    }
  });

  app.post("/api/genre", isAuth, async (req, res) => {
    try {
      logger.info(`${req.ip} /genre [post]`);
      insertGenre(req, res, connection);
    } catch (err) {
      logger.error(`${req.ip} ${err}`);
      res.status(500).json({ error: err.message });
    }
  });

  app.put("/api/genre", isAuth, async (req, res) => {
    try {
      logger.info(`${req.ip} /genre [put]`);
      updateGenre(req, res, connection);
    } catch (err) {
      logger.error(`${req.ip} ${err}`);
      res.status(500).json({ error: err.message });
    }
  });

  app.delete("/api/genre", isAuth, async (req, res) => {
    try {
      logger.info(`${req.ip} /genre [delete]`);
      deleteGenre(req, res, connection);
    } catch (err) {
      logger.error(`${req.ip} ${err}`);
      res.status(500).json({ error: err.message });
    }
  });

};
