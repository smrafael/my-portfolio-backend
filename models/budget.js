const Sequelize = require("sequelize");
const budgetStatus = require("./budget-status");
const moment = require("moment");

module.exports = function(sequelize) {
    const Budgets = sequelize.define("Budgets", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        fullname: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        phone: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        description: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        maxBudget: Sequelize.DECIMAL(10,2),
        deadline: {
            type: Sequelize.DATEONLY,
            validate: {
                isDate: true
            },
            get() {
                const deadline = this.getDataValue("deadline");
                return moment(deadline).format("DD/MM/YYYY");
            },
            set(val) {
                const deadline = moment(val, "DD-MM-YYYY")
                this.setDataValue("deadline", deadline);
            }
        },
        restrictions: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        otherConditions: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        status: {
            type: Sequelize.ENUM,
            values: [budgetStatus.pending, budgetStatus.accept, budgetStatus.reject],
            defaultValue: budgetStatus.pending
        }
    });
    return Budgets;
}