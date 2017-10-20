const config = require("../lib/config");
const budgetStatus = require("../models/budget-status");

const URL = config.base_api_url + "/budgets"
const URL_ID = URL + "/:id"
const URL_REJECT_BUDGET = URL_ID + "/reject";
const URL_ACCEPT_BUDGET = URL_ID + "/accept";

module.exports = function(app) {
    const Budgets = app.db.models.Budgets;

    app.get(URL, function(req, res) {
        Budgets.findAll().then(function(budgets) {
            res.json(budgets);
        });
    });

    app.post(URL, function(req, res) {
        Budgets.create(req.body)
            .then(function(result) {
                res.json(result);
            })
            .catch(function(err) {
                res.status(412).json({msg: err.message});
            });
    });

    app.get(URL_ID, function(req, res) {
        Budgets.findById(req.params.id)
            .then(function(budget) {
                if (budget) {
                    res.json(budget);
                } else {
                    res.sendStatus(404);
                }
            })
            .catch(function(err) {
                res.status(412).json({msg: err.message});
            });
    });

    function setBudgetStatus(status, req, res) {
        Budgets.findById(req.params.id)
            .then(function(budget) {
                if (budget) {
                    Budgets.update({status: status}, {where: req.params})
                        .then(function(result) {
                            res.sendStatus(204);
                        })
                        .catch(function(err) {
                            res.status(412).json({msg: err.message});
                        });
                } else {
                    res.sendStatus(404);
                }
            })
            .catch(function(err) {
                res.status(412).json({msg: err.message});
            });
    }

    app.put(URL_ACCEPT_BUDGET, function(req, res) {
        setBudgetStatus(budgetStatus.accept, req, res);
    });

    app.put(URL_REJECT_BUDGET, function(req, res) {
        setBudgetStatus(budgetStatus.reject, req, res);
    });
}