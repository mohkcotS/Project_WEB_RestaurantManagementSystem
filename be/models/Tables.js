module.exports = (sequelize,DataTypes) => {

    const Tables = sequelize.define("Tables",{
        name:{
            type: DataTypes.STRING,
            allowNull: false
        },

        type:{
            type: DataTypes.ENUM("S", "M", "L"),
            allowNull: false,
            defaultValue: "S"
        },

        status:{
            type: DataTypes.ENUM("available", "occupied"),
            allowNull: false,
            defaultValue: "available"
        }

        

    })

    Tables.associate = (models) => {
            Tables.hasMany(models.Orders, {
                onDelete: "cascade"
            });
    }

    return Tables

}