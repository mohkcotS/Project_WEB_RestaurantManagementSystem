const { toDefaultValue } = require("sequelize/lib/utils")

module.exports = (sequelize, DataTypes) => {

    const Order_Details = sequelize.define("Order_Details", {
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },


        status: {
            type: DataTypes.ENUM("preparing", "completed"),
            allowNull: false,
            defaultValue: "preparing"
        }

    })


    Order_Details.associate = (models) => {
        Order_Details.belongsTo(models.Dishes, {
            foreignKey: 'DishId',
        });
    };


    return Order_Details
}