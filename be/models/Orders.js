module.exports = (sequelize,DataTypes) => {

    const Orders = sequelize.define("Orders",{
        status:{
            type: DataTypes.ENUM("pending", "serving", "completed"),
            allowNull: false,
            defaultValue: "pending"
        },

        total_Price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
            defaultValue: 0
        }


    })

    Orders.associate = (models) => {
        Orders.hasMany(models.Order_Details, {
            onDelete: "cascade"
        });

        Orders.hasMany(models.Payments, {
            onDelete: "cascade"
        });
    }


    return Orders

}