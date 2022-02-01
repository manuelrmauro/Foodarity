const { Model, DataTypes } = require('sequelize');

class City extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          allowNull: false,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        lat: {
          type: DataTypes.DOUBLE,
          allowNull: false,
        },
        lon: {
          type: DataTypes.DOUBLE,
          allowNull: false,
        },
        state_id: {
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
    this.hasMany(models.Address, { as: 'address', foreignKey: 'city_id' });
    this.belongsTo(models.State, { as: 'state', foreignKey: 'state_id' });
    this.hasMany(models.Company, { as: 'company', foreignKey: 'city_id' });
  }
}

module.exports = City;
