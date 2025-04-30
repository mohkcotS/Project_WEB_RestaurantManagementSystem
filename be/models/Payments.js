module.exports = (sequelize,DataTypes) => {

    const Payments = sequelize.define("Payments",{

        amount:{
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },


        status:{
            type: DataTypes.ENUM("success", "failed", "refunded"),
            allowNull: false,
            defaultValue: "success"
        },

        method:{
            type: DataTypes.ENUM("cash", "card", "ewallet"),
            allowNull: false
        },

        date:{
            type: DataTypes.DATEONLY,
            allowNull: false
        },

        note: {
            type: DataTypes.STRING,
            allowNull: true
        },

        
    })

    Payments.associate = (models) => {
        Payments.belongsTo(models.Orders, {
            foreignKey: 'OrderId',
            onDelete: 'CASCADE' 
        });
    };

    return Payments
}