module.exports = (sequelize,DataTypes) => {

    const Payments = sequelize.define("Payments",{

        amount:{
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },


        status:{
            type: DataTypes.ENUM("pending", "success", "failed", "refunded"),
            allowNull: false,
            defaultValue: "pending"
        },

        method:{
            type: DataTypes.ENUM("cash", "card", "ewallet"),
            allowNull: false
        },

        date:{
            type: DataTypes.DATEONLY,
            allowNull: false
        }


        
    })

    return Payments
}