"use strict";

import { DataTypes, Model } from "sequelize";
import { sequelizeConnection } from "../connection";

interface UserEventAttributes {
  userId?: number;
  eventId?: number;

  id?: number;
  updatedAt?: Date;
  deletedAt?: Date;
  createdAt?: Date;
}

class UserEvent
  extends Model<UserEventAttributes>
  implements UserEventAttributes
{
  public id!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

UserEvent.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.NUMBER,
    },
    eventId: {
      allowNull: false,
      type: DataTypes.NUMBER,
    },
    userId: {
      allowNull: false,
      type: DataTypes.NUMBER,
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
    modelName: "UserEvent",
  }
);

export default UserEvent;
