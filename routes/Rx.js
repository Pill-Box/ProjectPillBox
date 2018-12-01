const db = require('../models')

module.exports = app => {

  app.post("/api/Rxs", function(req, res) {
    db.Rx.create(req.body).then(function(dbPost) {
      res.json(dbPost);
    });
  });

  app.delete('/api/Rxs/:id', (req, res) => {
    db.Rx.destroy({
      where: {
        id: req.params.id
      }
    }).then(data => {
      res.json(data);
    });
  });

}


