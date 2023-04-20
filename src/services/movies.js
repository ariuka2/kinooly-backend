const { isAuth } = require("../common/auth");
const { logger } = require("../common/log");

// postgresql сонгосон бол доорх мөрийн uncomment
const {
  getMovies,
  insertMovie,
  updateMovie,
  deleteMovie,
} = require("../logic/movies");

module.exports = function (app, connection) {
  /**
   * GET - Жагсаалт авах, ямар нэг дата харахад ашиглана => app.get()
   * POST - Login, Create дээр ашиглана => app.post()
   * PUT - Update буюу дата засахад ашиглана => app.put()
   * DELETE - Устгахад ашиглана => app.delete()
   */

  // endpoints
  app.get("/api/movies", isAuth, async (req, res) => {
    try {
      logger.info(`${req.ip} /movie [get]`);

      getMovies(req, res, connection);
    } catch (err) {
      logger.error(`${req.ip} ${err}`);
      res.status(500).json({ error: err.message });
    }
  });

  app.post("/api/movie", isAuth, async (req, res) => {
    try {
      logger.info(`${req.ip} /movie [post]`);
      insertMovie(req, res, connection);
    } catch (err) {
      logger.error(`${req.ip} ${err}`);
      res.status(500).json({ error: err.message });
    }
  });

  app.put("/api/movie", isAuth, async (req, res) => {
    try {
      logger.info(`${req.ip} /movie [put]`);
      updateMovie(req, res, connection);
    } catch (err) {
      logger.error(`${req.ip} ${err}`);
      res.status(500).json({ error: err.message });
    }
  });

  app.delete("/api/movie", isAuth, async (req, res) => {
    try {
      logger.info(`${req.ip} /movie [delete]`);
      deleteMovie(req, res, connection);
    } catch (err) {
      logger.error(`${req.ip} ${err}`);
      res.status(500).json({ error: err.message });
    }
  });
};
