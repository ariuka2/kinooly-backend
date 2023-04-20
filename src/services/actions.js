const { isAuth } = require("../common/auth");
const { logger } = require("../common/log");

// postgresql сонгосон бол доорх мөрийн uncomment
const {
  getActions,
  insertAction,
  updateAction,
  deleteAction,
} = require("../logic/actions");

module.exports = function (app, connection) {
  /**
   * GET - Жагсаалт авах, ямар нэг дата харахад ашиглана => app.get()
   * POST - Login, Create дээр ашиглана => app.post()
   * PUT - Update буюу дата засахад ашиглана => app.put()
   * DELETE - Устгахад ашиглана => app.delete()
   */

  // endpoints
  app.get("/api/actions", isAuth, async (req, res) => {
    try {
      logger.info(`${req.ip} /actions [get]`);

      getActions(req, res, connection);
    } catch (err) {
      logger.error(`${req.ip} ${err}`);
      res.status(500).json({ error: err.message });
    }
  });

  app.post("/api/action", isAuth, async (req, res) => {
    try {
      logger.info(`${req.ip} /action [post]`);
      insertAction(req, res, connection);
    } catch (err) {
      logger.error(`${req.ip} ${err}`);
      res.status(500).json({ error: err.message });
    }
  });

  app.put("/api/action", isAuth, async (req, res) => {
    try {
      logger.info(`${req.ip} /action [put]`);
      updateAction(req, res, connection);
    } catch (err) {
      logger.error(`${req.ip} ${err}`);
      res.status(500).json({ error: err.message });
    }
  });

  app.delete("/api/action", isAuth, async (req, res) => {
    try {
      logger.info(`${req.ip} /action [delete]`);
      deleteAction(req, res, connection);
    } catch (err) {
      logger.error(`${req.ip} ${err}`);
      res.status(500).json({ error: err.message });
    }
  });
};
