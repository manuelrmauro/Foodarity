const { Model, DataTypes } = require('sequelize');

class Address extends Model {
  static init(sequelize) {
    super.init(
      {
        street: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        number: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        zipcode: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        location: {
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
    this.belongsTo(models.State, { as: 'state', foreignKey: 'state_id' });
    this.belongsTo(models.City, { as: 'city', foreignKey: 'city_id' });
    this.hasOne(models.Company, { as: 'company', foreignKey: 'address_id' });
  }
}

module.exports = Address;
