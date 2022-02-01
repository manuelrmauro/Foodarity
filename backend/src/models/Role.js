const { Model, DataTypes } = require('sequelize');

class Role extends Model {
  static init(sequelize) {
    super.init(
      {
        role: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        sequelize,
      }
    );
  }

  static associate(models) {
    this.hasMany(models.User, { as: 'user', foreignKey: 'role_id' });
  }
}

module.exports = Role;
