'use strict';
const {
  Model
} = require('sequelize');
const jwt = require("jsonwebtoken");
const config = require("config");
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  user.init({
    userName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    isAdmin: {
      type:DataTypes.BOOLEAN,
      defaultValue:true
    },
    deletedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'user',
    paranoid:true
  });

  user.generateToekn = async({userName,email})=>{
    let token = await jwt.sign({userName,email},config.get("jwtPrivateKey"));
    return token
  }
  return user;
};