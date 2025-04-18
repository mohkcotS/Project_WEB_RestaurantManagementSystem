module.exports = (sequelize, DataTypes) => {

    const Users = sequelize.define("Users", {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },

        role: {
            type: DataTypes.ENUM("Customer", "Manager", "Chef", "Cashier"),
            allowNull: false
        },

        password: {
            type: DataTypes.STRING,
            allowNull: false
        }

    })

    Users.associate = (models) => {
        Users.hasMany(models.Orders, {
            foreignKey: {
                allowNull: true 
            },
            onDelete: "SET NULL" 
        });
    }

    return Users

}