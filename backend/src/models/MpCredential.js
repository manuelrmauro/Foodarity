const { Model, DataTypes } = require('sequelize');

class MpCredential extends Model {
  static init(sequelize) {
    super.init(
      {
        accessToken: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        expireIn: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        mpUserId: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        refreshToken: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        publicKey: {
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
    this.hasOne(models.Company, {
      as: 'company',
      foreignKey: 'mp_credential_id',
    });
  }
}

module.exports = MpCredential;
