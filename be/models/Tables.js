module.exports = (sequelize,DataTypes) => {

    const Tables = sequelize.define("Tables",{
        name:{
            type: DataTypes.STRING,
            allowNull: false
        },

        seats:{
            type: DataTypes.INTEGER,
            allowNull: false
        },

        status:{
            type: DataTypes.ENUM("available", "occupied"),
            allowNull: false
        }

        

    })

    Tables.associate = (models) => {
            Tables.hasMany(models.Orders, {
                onDelete: "cascade"
            });
    }

    return Tables

}