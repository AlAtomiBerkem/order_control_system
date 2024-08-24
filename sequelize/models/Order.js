const { DataTypes } = require('sequelize');

module.exports = function (sequelize) {
  const Order = sequelize.define("Order", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    itemId: { 
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'MenuItems', 
        key: 'id'
      }
    }
  });

  Order.associate = function (models) {
    Order.belongsTo(models.MenuItem, { foreignKey: 'itemId' });
  };

  return Order;
};
