"use strict";

import { DataTypes, Model } from "sequelize";
import { sequelizeConnection } from "../connection";

interface EventCategoryAttributes {
  categoryId?: number;
  eventId?: number;

  id?: number;
  updatedAt?: Date;
  deletedAt?: Date;
  createdAt?: Date;
}
class EventCategory
  extends Model<EventCategoryAttributes>
  implements EventCategoryAttributes
{
  public id!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}
EventCategory.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    eventId: {
      allowNull: false,
      type: DataTypes.NUMBER,
    },
    categoryId: {
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
    modelName: "EventCategory",
  }
);

export default EventCategory;
