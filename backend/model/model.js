const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(
  "postgresql://postgres.lubrypgqizxcfzhtopvr:44U5YIdTiHyOuy43@aws-0-us-east-1.pooler.supabase.com:6543/postgres"
);

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
