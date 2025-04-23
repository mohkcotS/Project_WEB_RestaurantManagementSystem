module.exports = (sequelize, DataTypes) => {
    const Rewards = sequelize.define("Rewards", {
        currentPoints: {
            type: DataTypes.FLOAT,
            allowNull: false,
            defaultValue: 0 
        },

        totalPoints: {
            type: DataTypes.FLOAT,
            allowNull: false,
            defaultValue: 0 
        },
        
        tier:{
            type: DataTypes.ENUM("Bronze", "Silver", "Gold", "Platinum", "Diamond"),
            allowNull: false,
            defaultValue: "Bronze" 
        }
    })


    Rewards.associate = (models) => {
        Rewards.belongsTo(models.Users, {
            foreignKey: { allowNull: false, unique: true }, 
            onDelete: "CASCADE" 
        });
    };

    return Rewards;
};