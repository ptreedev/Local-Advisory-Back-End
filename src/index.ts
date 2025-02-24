import Express from "express";
import User from "./database/models/user";
import { PORT } from "./configs";
import Event from "./database/models/events";
import Location from "./database/models/location"
import './database/models';

const server = Express();
const port = PORT || 8080;
server.get("/", async (req, res) => {
    const user = await User.create({
        firstName: "John",
        lastName: "Smith",
        email: "john@smith.co.uk",
        password: "johnsmith1"
    });
    const location = await Location.create({
        name: "First Direct",
        addressLine1: "12 Here Street",
        addressLine2: "Manchester",
        city: "Manchester",
        postCode: "M1 2TB",
        county: "Greater Manchester"
    });
    const event = await Event.create({
        name: 'NewEvent',
        description: '',
        dateFrom: new Date(),
        ownerId: user.id,
        timeStart: new Date(),
        locationId: location.id,
    });
    event.addAttendee(user);
    res.send(await Event.findOne({
        where: {
            id: event.id
        },
        include: [Location, 'attendees']
    }))
})
server.listen(port, () => {
    console.log(`Server is listeing on ${port}`)
})

