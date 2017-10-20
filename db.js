const Sequelize = require("sequelize");

const config = require("./lib/config");
const Budgets = require("./models/budget");

module.exports = function(app) {
    const sequelize = new Sequelize(
        config.database, 
        config.username, 
        config.password, 
        config.params);
    
    const db = {
        sequelize: sequelize,
        models: {}
    }
    
    db.models["Budgets"] = Budgets(sequelize);
    app.db = db;
}