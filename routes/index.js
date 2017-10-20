const config = require("../lib/config");
const budgetRoutes = require("./budget-routes");

module.exports = function(app) {
    app.get(config.base_api_url, function(req, res) {
        res.json({status: "My Portfolio API"});
    });

    budgetRoutes(app);
}