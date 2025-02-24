'use strict';

import { DataTypes, Model } from "sequelize";
import sequelizeConnection from "../connection";
import Event from "./events";
import UserEvent from "./user-event";

interface UserAttributes {
  firstName: string;
  lastName: string;
  email: string;
  password: string;

  id?: number;
  updatedAt?: Date;
  deletedAt?: Date;
  createdAt?: Date;
};

class User extends Model<UserAttributes> implements UserAttributes {
  public id!: number;
  public firstName!: string;
  public lastName!: string;
  public email!: string;
  public password!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

}


User.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.NUMBER
  },
  firstName: {
    allowNull: false,
    type: DataTypes.STRING
  },
  lastName: {
    allowNull: false,
    type: DataTypes.STRING
  },
  email: {
    allowNull: false,
    unique: true,
    type: DataTypes.STRING
  },
  password: {
    allowNull: false,
    type: DataTypes.STRING
  },
  createdAt: {
    allowNull: true,
    type: DataTypes.DATE
  },
  updatedAt: {
    allowNull: true,
    type: DataTypes.DATE
  }

}, {
  sequelize: sequelizeConnection,
  modelName: 'User',
});

// User.hasOne(Event);
// Event.belongsTo(User, {
//   foreignKey: 'ownerId'
// });
// class A extends Model {
//   public id!: number;
// }
// A.init({
//   id: {
//     autoIncrement: true,
//     primaryKey: true,
//     type: DataTypes.NUMBER
//   }
// },{
//   sequelize: sequelizeConnection,
//   modelName: 'A'
// });

// class B extends Model {
//   public id!: number;
// }
// B.init({
//   id: {
//     autoIncrement: true,
//     primaryKey: true,
//     type: DataTypes.NUMBER
//   }
// },{
//   sequelize: sequelizeConnection,
//   modelName: 'B'
// });
// A.belongsToMany(B, {
//   through: 'C'
// });

export default User;