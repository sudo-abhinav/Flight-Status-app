const { Sequelize, DataTypes } = require('sequelize');
require("dotenv").config(); 
const sequelize = new Sequelize(process.env.DB_URL);

const FlightNode = sequelize.define("Flight", {
  flight_id: { type: DataTypes.STRING, unique: true, allowNull: false },
  airline: { type: DataTypes.STRING, allowNull: false },
  status: { type: DataTypes.STRING, allowNull: false },
  from: { type: DataTypes.STRING, allowNull: false },
  to: { type: DataTypes.STRING, allowNull: false },
  departure_gate: { type: DataTypes.STRING, allowNull: false },
  arrival_gate: { type: DataTypes.STRING, allowNull: false },
  scheduled_departure: { type: DataTypes.DATE, allowNull: false },
  scheduled_arrival: { type: DataTypes.DATE, allowNull: false },
  actual_departure: { type: DataTypes.DATE },
  actual_arrival: { type: DataTypes.DATE },
});

const SubscriberNode = sequelize.define("Subscriber", {
  flight_id: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false },
  phone: { type: DataTypes.STRING, allowNull: false },
});

sequelize.sync();

module.exports={FlightNode, SubscriberNode}
