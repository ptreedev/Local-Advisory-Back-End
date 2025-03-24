import { Category } from "./category";
import EventCategory from "./event-categories";
import { Event } from "./events";
import { Location } from "./location";
import { Role } from "./role";
import { User } from "./user";
import UserEvent from "./user-event";

Role.hasMany(User, {
  foreignKey: "roleId",
  as: "users",
});

User.belongsTo(Role, {
  foreignKey: "roleId",
  as: "roles",
});

Location.hasMany(Event, {
  foreignKey: "locationId",
  as: "events",
});
Event.belongsTo(Location, {
  foreignKey: "locationId",
  as: "locations",
});
User.hasMany(Event, {
  foreignKey: "ownerId",
  as: "events",
});
Event.belongsTo(User, {
  foreignKey: "ownerId",
  as: "Owner",
});
User.belongsToMany(Event, {
  as: "registeredEvents",
  through: UserEvent,
  foreignKey: "eventId",
  otherKey: "userId",
});
Event.belongsToMany(User, {
  as: "attendees",
  through: UserEvent,
  foreignKey: "userId",
  otherKey: "eventId",
});
Category.belongsToMany(Event, {
  as: "events",
  through: EventCategory,
  foreignKey: "eventId",
  otherKey: "categoryId",
});
Event.belongsToMany(Category, {
  as: "category",
  through: EventCategory,
  foreignKey: "categoryId",
  otherKey: "eventId",
});
