const { Model, DataTypes } = require('sequelize');

class State extends Model {
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
      },
      {
        sequelize,
      }
    );
  }

  static associate(models) {
    this.hasMany(models.Address, { as: 'address', foreignKey: 'state_id' });
    this.hasMany(models.City, { as: 'state', foreignKey: 'state_id' });
  }
}

module.exports = State;
