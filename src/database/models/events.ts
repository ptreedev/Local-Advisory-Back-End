"use strict";
import {
  BelongsToManyAddAssociationMixin,
  DataTypes,
  Model,
  NonAttribute,
} from "sequelize";
import { sequelizeConnection } from "../connection";
import { User } from "./user";
import { Category } from "./category";

interface EventAttributes {
  name: string;
  description: string;
  dateFrom: Date;
  timeStart: Date;

  timeEnd?: Date;
  dateTo?: Date;
  image?: string;
  id?: number;
  locationId?: number;
  updatedAt?: Date;
  deletedAt?: Date;
  createdAt?: Date;
  ownerId?: number;
}

class Event extends Model<EventAttributes> implements EventAttributes {
  public id!: number;
  public name!: string;
  public description!: string;
  public dateFrom!: Date;
  public dateTo!: Date;
  public timeStart!: Date;
  public timeEnd!: Date;
  public image!: string;
  public locationId!: number;
  public ownerId!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  declare attendees?: NonAttribute<User[]>;
  declare addAttendee: BelongsToManyAddAssociationMixin<User, User["id"]>;
  declare category?: NonAttribute<Category[]>;
  declare addCategory: BelongsToManyAddAssociationMixin<
    Category,
    Category["id"]
  >;
}
Event.init(
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
    description: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    image: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    dateFrom: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    dateTo: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    timeStart: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    timeEnd: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    ownerId: {
      type: DataTypes.INTEGER,
    },
    locationId: {
      type: DataTypes.INTEGER,
    },
  },
  {
    sequelize: sequelizeConnection,
    modelName: "Event",
  }
);

export { Event, EventAttributes };
