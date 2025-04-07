module.exports = (sequelize,DataTypes) => {

    const Order_Details = sequelize.define("Order_Details",{
        quantity:{
            type: DataTypes.INTEGER,
            allowNull: false
        },

        price:{
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },


        status:{
            type: DataTypes.ENUM("pending", "preparing", "ready", "delivered"),
            allowNull: false
        }
        
    })

    return Order_Details
}