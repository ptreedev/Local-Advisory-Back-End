"use strict";
import { DataTypes, Model } from "sequelize";
import { sequelizeConnection } from "../connection";

interface RoleAttributes {
  name: string;

  id?: number;
  updatedAt?: Date;
  deletedAt?: Date;
  createdAt?: Date;
}
class Role extends Model<RoleAttributes> implements RoleAttributes {
  public name!: string;
  public id!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Role.init(
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
    modelName: "Role",
  }
);
export { Role, RoleAttributes };
