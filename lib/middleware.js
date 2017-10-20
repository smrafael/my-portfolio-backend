const bodyParser = require("body-parser");

module.exports = function(app) {
    app.set("json spaces", 4);
    app.use(bodyParser.json());
    app.use((req, res, next) => {
        if (req.body && req.body.id) {
            delete req.body.id;
        }
        next();
    });
}