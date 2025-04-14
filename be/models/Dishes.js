module.exports = (sequelize,DataTypes) => {

    const Dishes = sequelize.define("Dishes",{
        name:{
            type: DataTypes.STRING,
            allowNull: false
        },

        type:{
            type: DataTypes.ENUM("Appetizer", "Main Course", "Dessert", "Side Dish","Beverage"),
            allowNull: false
        },

        price:{
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },

        status:{
            type: DataTypes.ENUM("available", "sold out"),
            allowNull: false
        },

        imageUrl:{
            type: DataTypes.STRING,
            allowNull: false
        },
    })

    Dishes.associate = (models) => {
        Dishes.hasMany(models.Order_Details, {
            onDelete: "cascade"
        });
    }

    return Dishes
}