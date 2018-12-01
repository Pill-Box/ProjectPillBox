const db = require('../models')
module.exports = app => {
//New User

//New Patient route
  app.post('/api/patients', (req, res) => {
    db.Patient.create(req.body).then(data => {
      res.json(data)
    })
  })

// List of patients
//Get all patients by user id
  app.get("/api/user/patients/:id", (req, res) => {
    db.User.findOne({
      where: {
        id: req.params.id
      },
      include: [db.Patient],
    }).then(data => {
      res.json(data)
    })
  });

//List of Patients and their Rxs
//Get all patients and rxs by user id
  app.get("/api/user/patient/rx/:id", (req, res) => {
    db.User.findOne({
      where: {
        id: req.params.id
      },
      include: [{
        model: db.Patient,
        include: [{
          model: db.Rx,
        }]
      }]
    }).then(data => {
      res.json(data);
    });
  })

//Get a list of Patients Rxs by patient id
  app.get("/api/user/patient/:patientId", (req, res) => {
    db.Patient.findOne({
      where: {
        id: req.params.patientId
      },
      include: [{
        model: db.Rx
      }]
    }).then(data => {
      res.json(data);
    });
  })

  app.delete('/api/user/patient/:id', (req, res) => {
    db.Patient.destroy({
      where: {
        id: req.params.id
      }
    }).then(data => {
      res.json(data);
    });
  });

}
