module.exports = function(sequelize, DataTypes){
    var Catalyst = sequelize.define("Catalyst", {
        body:{
            type: DataTypes.TEXT,
            allowNull: false,
            len: [1]
        }
    });
    Catalyst.associate = function(models){
        Catalyst.belongsTo(models.User, {
            foreignKey:{
                allowNull:false
            }
        });
    };
    return Catalyst;
}