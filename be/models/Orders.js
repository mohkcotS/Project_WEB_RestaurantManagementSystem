module.exports = (sequelize,DataTypes) => {

    const Orders = sequelize.define("Orders",{
        status:{
            type: DataTypes.ENUM("pending", "preparing", "ready", "delivered"),
            allowNull: false
        },

        total_Price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
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