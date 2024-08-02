const express = require("express");
const cors = require("cors");
// import { Flight, Subscriber } from "./model/model";
const model = require("./model/model");
const smsServices = require("./services/twillioService");
const emailService = require('./services/mailService')
const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);

app.get("/api/flight", async (req, res) => {
  try {
    const flightData = await model.FlightNode.findAll();
    res.status(201).json(flightData);
  } catch (error) {}
});

// Example route
app.post("/api/subscribe", async (req, res) => {
  try {
    const { flight_id, email, phone } = req.body;
    console.log(req.body);
    const subscriber = await model.SubscriberNode.create({
      flight_id,
      email,
      phone,
    });

    const flight = await model.FlightNode.findOne({ where: { flight_id } });
    if (!flight) {
      return res.status(404).json({ message: "Flight not found." });
    }

    // const body = '';
    if (flight.status === "Delayed") {
      body = `Flight ${flight_id} ${flight.airline} Delayed. Current status: ${flight.status}. Departure gate: ${flight.departure_gate}. We apologize for the inconvenience.`;
    } else if (flight.status === "On Time") {
      body = `Flight ${flight_id}  at ${flight.airline} On Time. " + "Current status:  ${flight.status}. Departure gate: ${flight.departure_gate} .Thank you For Connecting with Us Wish you more ${flight_id}  flights.`;
    } else if (flight.status === "Cancelled") {
      body = `Sorry for inconvenience your Flight ${flight_id} from ${flight.from} to ${flight.to}. We Will Reschedule Shortly, keep patience.`;
    }

    console.log(body);
    // smsServices(body, phone);
    emailService(email, body);
    res.status(201).json({ message: "Subscribed successfully!", subscriber });
  } catch (error) {
    res.status(500).json({ message: "Error subscribing user.", error });
  }
});

app.listen(port, () => {
  console.log(`Server running on  ${port}`);
});
