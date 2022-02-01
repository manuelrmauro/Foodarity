const { Model, DataTypes } = require('sequelize');

class Product extends Model {
  static init(sequelize) {
    super.init(
      {
        lote: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        description: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        quantity: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        totalQuantity: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        photo: {
          type: DataTypes.JSON,
          allowNull: true,
        },
        price: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        publicationDate: {
          type: DataTypes.DATEONLY,
          allowNull: false,
        },
        expirationDate: {
          type: DataTypes.DATEONLY,
          allowNull: false,
        },
        status: {
          type: DataTypes.ENUM('published', 'finished', 'canceled'),
          allowNull: false,
          defaultValue: 'published',
        },
      },
      {
        sequelize,
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.Category, {
      as: 'category',
      foreignKey: 'category_id',
    });
    this.belongsTo(models.Company, { as: 'company', foreignKey: 'company_id' });
    this.belongsTo(models.User, {
      as: 'publisher',
      foreignKey: 'publisher_id',
    });
    this.hasMany(models.Cart, { as: 'cart', foreignKey: 'product_id' });
  }
}

module.exports = Product;
