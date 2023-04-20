const { isAuth } = require("../common/auth");
const { logger } = require("../common/log");

// postgresql сонгосон бол доорх мөрийн uncomment
const {
  getWatchlists,
  insertWatchlist,
  updateWatchlist,
  deleteWatchlist,
} = require("../logic/watchlists");


module.exports = function (app, connection) {
  /**
   * GET - Жагсаалт авах, ямар нэг дата харахад ашиглана => app.get()
   * POST - Login, Create дээр ашиглана => app.post()
   * PUT - Update буюу дата засахад ашиглана => app.put()
   * DELETE - Устгахад ашиглана => app.delete()
   */


  // endpoints
  app.get("/api/watchlists", isAuth, async (req, res) => {
    try {
      logger.info(`${req.ip} /watchlist [get]`);

      getWatchlists(req, res, connection);
    } catch (err) {
      logger.error(`${req.ip} ${err}`);
      res.status(500).json({ error: err.message });
    }
  });

  app.post("/api/watchlist", isAuth, async (req, res) => {
    try {
      logger.info(`${req.ip} /watchlist [post]`);
      insertWatchlist(req, res, connection);
    } catch (err) {
      logger.error(`${req.ip} ${err}`);
      res.status(500).json({ error: err.message });
    }
  });

  app.put("/api/watchlist", isAuth, async (req, res) => {
    try {
      logger.info(`${req.ip} /watchlist [put]`);
      updateWatchlist(req, res, connection);
    } catch (err) {
      logger.error(`${req.ip} ${err}`);
      res.status(500).json({ error: err.message });
    }
  });

  app.delete("/api/watchlist", isAuth, async (req, res) => {
    try {
      logger.info(`${req.ip} /watchlist [delete]`);
      deleteWatchlist(req, res, connection);
    } catch (err) {
      logger.error(`${req.ip} ${err}`);
      res.status(500).json({ error: err.message });
    }
  });

};
