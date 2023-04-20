const { isAuth } = require("../common/auth");
const { logger } = require("../common/log");

// postgresql сонгосон бол доорх мөрийн uncomment
const {
  getMovies_genres,
  insertMovies_genre,
  updateMovies_genre,
  deleteMovies_genre,
} = require("../logic/movies_genres");

module.exports = function (app, connection) {
  /**
   * GET - Жагсаалт авах, ямар нэг дата харахад ашиглана => app.get()
   * POST - Login, Create дээр ашиглана => app.post()
   * PUT - Update буюу дата засахад ашиглана => app.put()
   * DELETE - Устгахад ашиглана => app.delete()
   */

  // endpoints
  app.get("/api/movies_genres", isAuth, async (req, res) => {
    try {
      logger.info(`${req.ip} /movies_genre [get]`);
      getMovies_genres(req, res, connection);
    } catch (err) {
      logger.error(`${req.ip} ${err}`);
      res.status(500).json({ error: err.message });
    }
  });

  app.post("/api/movies_genre", isAuth, async (req, res) => {
    try {
      logger.info(`${req.ip} /movies_genre [post]`); // M, m tom jijig baih hamaataimuu
      insertMovies_genre(req, res, connection);
    } catch (err) {
      logger.error(`${req.ip} ${err}`);
      res.status(500).json({ error: err.message });
    }
  });

  app.put("/api/movies_genre", isAuth, async (req, res) => {
    try {
      logger.info(`${req.ip} /Movies_genre [put]`);
      updateMovies_genre(req, res, connection);
    } catch (err) {
      logger.error(`${req.ip} ${err}`);
      res.status(500).json({ error: err.message });
    }
  });

  app.delete("/api/movies_genre", isAuth, async (req, res) => {
    try {
      logger.info(`${req.ip} /Movies_genre [delete]`);
      deleteMovies_genre(req, res, connection);
    } catch (err) {
      logger.error(`${req.ip} ${err}`);
      res.status(500).json({ error: err.message });
    }
  });
};
