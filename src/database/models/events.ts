'use strict';
import { DataTypes, Model } from "sequelize";
import sequelizeConnection from "../connection";


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
}
  Event.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.NUMBER
    }, 
    name: {
      allowNull: false,
      type: DataTypes.STRING
    },
    description: {
      allowNull: false,
      type: DataTypes.STRING
    },
    dateFrom: {
      allowNull: false,
      type: DataTypes.DATE
    },
    timeStart: {
      allowNull: false,
      type: DataTypes.DATE
    },
    ownerId: {
      allowNull: false,
      type: DataTypes.NUMBER
    },
    locationId: {
      allowNull: false,
      type: DataTypes.NUMBER
    }

  }, {
    sequelize: sequelizeConnection,
    modelName: 'Event',
  });
// User.hasOne(Event); 
// Event.belongsTo(User, {
//   foreignKey: 'ownerId'
// });
// Location.hasMany(Event);
// Event.belongsTo(Location);
// Event.belongsToMany(User, {
//   through: "UserEvent",
//   as: "users"
// })  
export default Event