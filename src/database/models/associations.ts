import { Sequelize } from "sequelize";

const helper = (sequelize: Sequelize): void => {
    const {Location, User, Event} = sequelize.models;

    Location.hasMany(Event);
    Event.belongsTo(Location);
    User.hasOne(Event); 
    Event.belongsTo(User, {
        foreignKey: 'ownerId'
    });
    
    // Event.belongsToMany(User, {
    //     through: "UserEvent"
    // });
    // User.belongsToMany(Event, {
    //     through: "UserEvent"
    // });
};

module.exports = {helper}