const db = require('../models')

module.exports = app => {
    app.get('/api/user/:id', (req, res) => {
        db.User.findOne({
            where: {
                id: req.params.id
            }
        }).then(data => {
            res.json(data)
        })
    })

    app.post('/api/user', (req, res) => {
        db.User.create(req.body).then(data => {
            res.json(data)
        })
    })

    app.get('/signout', function(req, res){
        req.logout();
        console.log("removing JWT");
        localStorage.removeItem(JWT);
        res.redirect('/login');
    });
}