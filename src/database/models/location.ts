"use strict";

import { DataTypes, Model } from "sequelize";
import { sequelizeConnection } from "../connection";

interface LocationAttributes {
  name: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  county: string;
  postCode: string;

  id?: number;
  updatedAt?: Date;
  deletedAt?: Date;
  createdAt?: Date;
}

class Location extends Model<LocationAttributes> implements LocationAttributes {
  public id!: number;
  public name!: string;
  public addressLine1!: string;
  public addressLine2!: string;
  public city!: string;
  public county!: string;
  public postCode!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}
Location.init(
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
    addressLine1: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    addressLine2: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    city: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    county: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    postCode: {
      allowNull: false,
      type: DataTypes.STRING,
    },
  },
  {
    sequelize: sequelizeConnection,
    modelName: "Location",
  }
);
// Location.hasMany(Event);
export default Location;
