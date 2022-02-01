const { Model, DataTypes } = require('sequelize');

class Category extends Model {
  static init(sequelize) {
    super.init(
      {
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        deleted: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
      },
      {
        sequelize,
      }
    );
  }

  static associate(models) {
    this.hasMany(models.Product, { as: 'products', foreignKey: 'category_id' });
    // se agrega una ForeingKey donationId a la tabla Donation
    this.hasMany(models.Donation, {
      as: 'donation',
      foreignKey: 'category_id',
    });
  }
}

module.exports = Category;
