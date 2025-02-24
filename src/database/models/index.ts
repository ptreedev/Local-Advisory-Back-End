import Event from "./events";
import Location from "./location";
import User from "./user";
import UserEvent from "./user-event";

Location.hasMany(Event);
Event.belongsTo(Location);
User.hasMany(Event, {
    foreignKey: 'ownerId',
    as: 'events'
}); 
Event.belongsTo(User, {
    foreignKey: 'ownerId',
    as: 'Owner'
});
User.belongsToMany(Event, {
    as: 'registeredEvents',
    through: UserEvent,
    foreignKey: 'eventId',
    otherKey: 'userId'
}); 
Event.belongsToMany(User, {
    as: 'attendees',
    through: UserEvent,
    foreignKey: 'userId',
    otherKey: 'eventId'
})