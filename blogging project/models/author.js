'use strict';
const {
  Model
} = require('sequelize');
const config = require("config")
const jwt = require("jsonwebtoken")
module.exports = (sequelize, DataTypes) => {
  class author extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      author.hasOne(models.blogs,{foreignKey:"authorId",as:"blog",onDelete:"CASCADE"});
    }
  }
  author.init({
    fname: DataTypes.STRING,
    lname: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    title: DataTypes.ENUM("Mr"),
    isDeleted: DataTypes.BOOLEAN,
    deletedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'author',
    paranoid:true,
  });

  author.generateToken = (email,id)=>{
    let token = jwt.sign({email,id},config.get("jwtPrivateKey"))
    return token
  }

  return author;
};