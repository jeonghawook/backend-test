"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Likes, {
        sourceKey: "user_id",
        foreignKey: "user_id",
      });
      this.hasMany(models.Comments, {
        sourceKey: "user_id",
        foreignKey: "user_id",
      });
      this.hasMany(models.Posts, {
        sourceKey: "user_id",
        foreignKey: "user_id",
      });
      this.hasOne(models.UserInfos, {
        sourceKey: "user_id",
        foreignKey: "user_id",
      });
    }
  }
  Users.init(
    {
      user_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      nickname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Users",
      timestamps: false,
    }
  );
  return Users;
};
