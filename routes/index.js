const config = require("../lib/config");
const budgetRoutes = require("./budget-routes");

module.exports = function(app) {

    /**
    * @api {get} /api API Status
    * @apiGroup Status
    * @apiSuccess {String} status Mensagem de status da API
    * @apiSuccessExample {json} Sucesso
    * HTTP/1.1 200 OK
    * {"status": "NTask API"}
    */
    app.get(config.base_api_url, function(req, res) {
        res.json({status: "My Portfolio API"});
    });

    budgetRoutes(app);
}