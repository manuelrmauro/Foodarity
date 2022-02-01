const { Model, DataTypes } = require('sequelize');

class Company extends Model {
  static init(sequelize) {
    super.init(
      {
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        description: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        areaCode: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        phone: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        website: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        logo: {
          type: DataTypes.JSON,
          allowNull: true,
        },
        banner: {
          type: DataTypes.JSON,
          allowNull: true,
        },
        status: {
          // cuenta habilitada o no
          type: DataTypes.ENUM(
            'Habilitada',
            'Deshabilitada',
            'Pendiente',
            'Banneada'
          ),
          allowNull: false,
          defaultValue: 'Pendiente',
        },
        deleted: {
          // cuenta eliminada o no
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        ownerId: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        mpCode: {
          type: DataTypes.UUID,
          allowNull: true,
        },
      },
      {
        sequelize,
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.CompanyType, {
      as: 'type',
      foreignKey: 'company_type_id',
    });
    this.hasMany(models.User, { as: 'user', foreignKey: 'company_id' });
    this.belongsTo(models.Address, { as: 'address', foreignKey: 'address_id' });
    this.hasMany(models.Product, { as: 'product', foreignKey: 'company_id' });
    this.hasMany(models.Donation, {
      as: 'donation',
      foreignKey: 'commerce_id',
    });
    this.hasMany(models.Order, { as: 'order', foreignKey: 'company_id' });
    this.belongsTo(models.MpCredential, {
      as: 'mpcredential',
      foreignKey: 'mp_credential_id',
    });
  }
}

module.exports = Company;
