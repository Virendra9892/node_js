'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class blogs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      blogs.belongsTo(models.author,{foreignKey:"authorId",onDelete:"CASCADE"});
    }
  }
  blogs.init({
    title: DataTypes.STRING,
    body: DataTypes.STRING,
    authorId: DataTypes.INTEGER,
    tags: DataTypes.STRING,
    category:  DataTypes.STRING,
    subCategory: DataTypes.STRING,
    isDeleted: DataTypes.BOOLEAN,
    publishedAt: DataTypes.DATE,
    isPublished: DataTypes.BOOLEAN,
    deletedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'blogs',
    paranoid:true
  });
  return blogs;
};