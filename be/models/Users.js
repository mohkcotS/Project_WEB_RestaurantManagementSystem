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
        },

        phoneNumber: {
            type: DataTypes.STRING,
            allowNull: true
        }

    })

    Users.associate = (models) => {
        Users.hasMany(models.Orders, {
          foreignKey: {
            allowNull: true
          },
          onDelete: "SET NULL"
        });
      
        Users.hasOne(models.Rewards, {
          foreignKey: { allowNull: false, unique: true },
          onDelete: "CASCADE"
        });
      };
      
    return Users

}