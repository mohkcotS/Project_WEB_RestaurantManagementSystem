module.exports = (sequelize, DataTypes) => {
    const Rewards = sequelize.define("Rewards", {
        points: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0 
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