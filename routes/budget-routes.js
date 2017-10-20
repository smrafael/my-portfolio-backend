const config = require("../lib/config");
const budgetStatus = require("../models/budget-status");

const URL = config.base_api_url + "/budgets"
const URL_ID = URL + "/:id"
const URL_REJECT_BUDGET = URL_ID + "/reject";
const URL_ACCEPT_BUDGET = URL_ID + "/accept";

module.exports = function(app) {
    const Budgets = app.db.models.Budgets;

    /**
    * @api {get} /api/budgets Listar pedidos de orçamento
    * @apiGroup Budget
    * @apiSuccess {Object[]} budgets Lista de pedidos de orçamento
    * @apiSuccess {Number} budgets.id Id de registro
    * @apiSuccess {String} budgets.fullname Nome de quem fez o pedido de orçamento
    * @apiSuccess {String} budgets.email Email de quem fez o pedido de orçamento
    * @apiSuccess {String} budgets.phone Telefone de quem fez o pedido de orçamento
    * @apiSuccess {String} budgets.description Descrição do projeto
    * @apiSuccess {Number} budgets.maxBudget Orçamento máximo que o cliente estã disposta a pagar
    * @apiSuccess {Date} budgets.deadline Data limite para entrega do projeto
    * @apiSuccess {String} budgets.restrictions Restrições do projeto
    * @apiSuccess {String} budgets.otherConditions Outras condições do projeto
    * @apiSuccess {Date} tasks.updated_at Data de atualização
    * @apiSuccess {Date} tasks.created_at Data de cadastro
    * @apiSuccessExample {json} Sucesso
    * HTTP/1.1 200 OK
    * 
    [
        {
            "deadline": "30/11/1990",
            "id": 1,
            "fullname": "Bruno Bueno",
            "email": "bruno@bruno.com",
            "phone": "988888888",
            "description": "project description",
            "maxBudget": 1000,
            "restrictions": "project restrictions",
            "otherConditions": "project other protections",
            "status": "pending",
            "created_at": "2017-10-20T21:15:28.600Z",
            "updated_at": "2017-10-20T21:15:28.600Z"
        },
        {
            "deadline": "30/11/1990",
            "id": 2,
            "fullname": "Rafael Mendes",
            "email": "rafael@rafael.com",
            "phone": "988888881",
            "description": "project description",
            "maxBudget": 1500,
            "restrictions": "project restrictions",
            "otherConditions": "project other protections",
            "status": "pending",
            "created_at": "2017-10-20T21:15:50.563Z",
            "updated_at": "2017-10-20T21:15:50.563Z"
        }
    ]
    */
    app.get(URL, function(req, res) {
        Budgets.findAll().then(function(budgets) {
            res.json(budgets);
        });
    });

    /**
    * @api {post} /api/budgets Cadastrar um pedido de orçamento
    * @apiGroup Budget
    * @apiParam {String} fullname Nome Completo do requisitante
    * @apiParam {String} email Email do requisitante
    * @apiParam {String} phone Telefone do requisitante
    * @apiParam {String} description Descrição do projeto
    * @apiParam {Number} maxBudget Orçamento máximo esperado
    * @apiParam {Date} deadline Data limite do projeto
    * @apiParam {String} restrictions Restrições do projeto
    * @apiParam {String} otherConditions Outras condições do projeto
    * @apiParamExample {json} Entrada
    {
        "fullname": "Rafael Mendes",
        "email": "rafael@gmail.com",
        "phone": "988888888",
        "description": "project description",
        "maxBudget": "1500.00",
        "deadline": "30/11/1990",
        "restrictions": "project restrictions",
        "otherConditions": "project other protections"
    }
    * @apiSuccess {Object} budget Pedido de orçamento
    * @apiSuccess {Number} budget.id Id de registro
    * @apiSuccess {String} budget.fullname Nome de quem fez o pedido de orçamento
    * @apiSuccess {String} budget.email Email de quem fez o pedido de orçamento
    * @apiSuccess {String} budget.phone Telefone de quem fez o pedido de orçamento
    * @apiSuccess {String} budget.description Descrição do projeto
    * @apiSuccess {Number} budget.maxBudget Orçamento máximo que o cliente estã disposta a pagar
    * @apiSuccess {Date} budget.deadline Data limite para entrega do projeto
    * @apiSuccess {String} budget.restrictions Restrições do projeto
    * @apiSuccess {String} budget.otherConditions Outras condições do projeto
    * @apiSuccess {Date} budget.updated_at Data de atualização
    * @apiSuccess {Date} budget.created_at Data de cadastro
    * @apiSuccessExample {json} Sucesso
    * HTTP/1.1 200 OK
    * 
    {
        "deadline": "30/11/1990",
        "status": "pending",
        "id": 2,
        "fullname": "Rafael Mendes",
        "email": "rafael@gmail.com",
        "phone": "988888888",
        "description": "project description",
        "maxBudget": "1500.00",
        "restrictions": "project restrictions",
        "otherConditions": "project other protections",
        "updated_at": "2017-10-20T21:15:50.563Z",
        "created_at": "2017-10-20T21:15:50.563Z"
    }
    */
    app.post(URL, function(req, res) {
        Budgets.create(req.body)
            .then(function(result) {
                res.json(result);
            })
            .catch(function(err) {
                res.status(412).json({msg: err.message});
            });
    });

    /**
    * @api {get} /api/budgets/:id Retornar um pedido de orçamento
    * @apiGroup Budget
    * @apiParam {id} id Id do pedido
    * @apiSuccess {Object} budget Pedido de orçamento
    * @apiSuccess {Number} budget.id Id de registro
    * @apiSuccess {String} budget.fullname Nome de quem fez o pedido de orçamento
    * @apiSuccess {String} budget.email Email de quem fez o pedido de orçamento
    * @apiSuccess {String} budget.phone Telefone de quem fez o pedido de orçamento
    * @apiSuccess {String} budget.description Descrição do projeto
    * @apiSuccess {Number} budget.maxBudget Orçamento máximo que o cliente estã disposta a pagar
    * @apiSuccess {Date} budget.deadline Data limite para entrega do projeto
    * @apiSuccess {String} budget.restrictions Restrições do projeto
    * @apiSuccess {String} budget.otherConditions Outras condições do projeto
    * @apiSuccess {Date} budget.updated_at Data de atualização
    * @apiSuccess {Date} budget.created_at Data de cadastro
    * @apiSuccessExample {json} Sucesso
    * HTTP/1.1 200 OK
    * 
    {
        "deadline": "30/11/1990",
        "id": 1,
        "fullname": "Bruno Bueno",
        "email": "bruno@bruno.com",
        "phone": "988888888",
        "description": "project description",
        "maxBudget": 1000,
        "restrictions": "project restrictions",
        "otherConditions": "project other protections",
        "status": "pending",
        "created_at": "2017-10-20T21:15:28.600Z",
        "updated_at": "2017-10-20T21:15:28.600Z"
    }
    */
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

    /**
    * @api {put} /api/budgets/:id/accept Marcar o pedido como aceito pelo o cliente
    * @apiGroup Budget
    * @apiParam {id} id Id do pedido
    * @apiSuccessExample Sucesso
    * HTTP/1.1 204 No content
    */
    app.put(URL_ACCEPT_BUDGET, function(req, res) {
        setBudgetStatus(budgetStatus.accept, req, res);
    });

    /**
    * @api {put} /api/budgets/:id/reject Marcar o pedido como rejeitado pelo o cliente
    * @apiGroup Budget
    * @apiParam {id} id Id do pedido
    * @apiSuccessExample Sucesso
    * HTTP/1.1 204 No content
    */
    app.put(URL_REJECT_BUDGET, function(req, res) {
        setBudgetStatus(budgetStatus.reject, req, res);
    });
}