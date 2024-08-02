import FlightStatus from "./components/FlightStatus";
// FlightStatus.js
import { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Notifications from "./components/Notifications";
// require("dotenv").config();

function App() {
  const [flights, setFlights] = useState([]);

  useEffect(() => {
    axios
      .get("https://flight-status-app.onrender.com/api/flight")
      // http://localhost:3000/flight
      .then((response) => {
        console.log("Fetched flights data:", response.data); // Debugging line
        setFlights(response.data);
      })
      .catch((error) => console.error("Error fetching flight data:", error));
  }, []);
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<Notifications flights={flights} />}
        />
        <Route path="/status" element={<FlightStatus flights={flights} />} />
      </Routes>
    </Router>
  );
}

export default App;
