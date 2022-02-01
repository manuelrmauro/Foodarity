const { Model, DataTypes } = require('sequelize');

class CompanyType extends Model {
  static init(sequelize) {
    super.init(
      {
        type: {
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
    this.hasMany(models.Company, {
      as: 'company',
      foreignKey: 'company_type_id',
    });
  }
}

module.exports = CompanyType;
