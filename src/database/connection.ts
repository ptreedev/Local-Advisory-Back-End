import { Sequelize } from 'sequelize';
import { DB_DATABASE, DB_HOST, DB_PASSWORD, DB_USERNAME } from '../configs';
import { SqliteDialect } from '@sequelize/sqlite3';

let sequelizeConnection: Sequelize = new Sequelize(DB_DATABASE, DB_USERNAME, DB_PASSWORD, {
  dialect: "sqlite",
  storage: "sequelize.sqlite"
});

export default sequelizeConnection;