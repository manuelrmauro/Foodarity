const { Model, DataTypes } = require('sequelize');

class Donation extends Model {
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
        photo: {
          type: DataTypes.JSON,
          allowNull: true,
        },
      },
      {
        sequelize,
      }
    );
  }

  static associate(models) {
    // se agrega una ForeingKey categoriId a la tabla Donation
    this.belongsTo(models.Category, {
      as: 'category',
      foreignKey: 'category_id',
    });
    this.belongsTo(models.Company, { as: 'ong', foreignKey: 'ong_id' });
    this.belongsTo(models.Company, {
      as: 'company',
      foreignKey: 'commerce_id',
    });
    this.belongsTo(models.User, {
      as: 'publisher',
      foreignKey: 'publisher_id',
    });
  }
}

module.exports = Donation;
