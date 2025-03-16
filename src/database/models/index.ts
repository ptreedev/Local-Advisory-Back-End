import { Category } from "./category";
import EventCategory from "./event-categories";
import { Event } from "./events";
import { Location } from "./location";
import { User } from "./user";
import UserEvent from "./user-event";

Location.hasMany(Event, {
  foreignKey: "eventId",
});
Event.belongsTo(Location);
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
