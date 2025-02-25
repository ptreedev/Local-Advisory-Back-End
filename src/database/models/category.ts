"use strict";
import { DataTypes, Model } from "sequelize";
import sequelizeConnection from "../connection";

interface CategoryAttributes {
  name: string;

  id?: number;
  updatedAt?: Date;
  deletedAt?: Date;
  createdAt?: Date;
}
class Category extends Model<CategoryAttributes> implements CategoryAttributes {
  public name!: string;
  public id!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Category.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING,
    },
  },
  {
    sequelize: sequelizeConnection,
    modelName: "Category",
  }
);
export default Category;
