"use strict";

import {
  BelongsToManyAddAssociationMixin,
  DataTypes,
  Model,
  NonAttribute,
} from "sequelize";
import { Event } from "./events";

import { sequelizeConnection } from "../connection";
interface UserAttributes {
  firstName: string;
  lastName: string;
  email: string;
  password: string;

  roleId?: number;
  id?: number;
  updatedAt?: Date;
  deletedAt?: Date;
  createdAt?: Date;
}

class User extends Model<UserAttributes> implements UserAttributes {
  public id!: number;
  public firstName!: string;
  public lastName!: string;
  public email!: string;
  public password!: string;
  public roleId!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  declare registeredEvents?: NonAttribute<Event[]>;
  declare addRegisteredEvent: BelongsToManyAddAssociationMixin<
    Event,
    Event["id"]
  >;
}

User.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    firstName: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    lastName: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    email: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING,
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    roleId: {
      type: DataTypes.INTEGER,
    },
    createdAt: {
      allowNull: true,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: true,
      type: DataTypes.DATE,
    },
  },
  {
    sequelize: sequelizeConnection,
    modelName: "User",
  }
);

export { User, UserAttributes };
