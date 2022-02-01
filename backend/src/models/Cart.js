const { Model, DataTypes } = require('sequelize');

class Cart extends Model {
  static init(sequelize) {
    super.init(
      {
        quantity: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
      },
      {
        sequelize,
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.User, { as: 'user', foreignKey: 'user_id' });
    this.belongsTo(models.Product, { as: 'product', foreignKey: 'product_id' });
  }
}

module.exports = Cart;
