/* eslint-disable react/prop-types */
// Notifications.js
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const Notifications = ({ flights }) => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [dropdownData, setDropdownData] = useState("");
  const [message, setMessage] = useState("");

  const handleSubscribe = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://flight-status-app.onrender.com/api/subscribe", {
        flight_id: dropdownData,
        email: email,
        phone: phone,
      });
      console.log("Subscribed:", response.data);
      toast.success("Successfully subscribed to flight updates!");
    } catch (error) {
      console.error("Error subscribing:", error);
      toast.error("Failed to subscribe. Please try again.");
    }

    setPhone("");
    setEmail("");
    setDropdownData("");
  };

  const handleNumberValidation = (e) => {
    const phone = e.target.value;
    setPhone(phone);
    const isNumeric = /^\d{10}$/.test(phone);

    if (isNumeric) {
      setMessage("");
    } else {
      setMessage("Mobile number must be exactly 10 digits.");
    }
  };

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <div className="bg-blue-900 min-h-screen py-8">
        <div className="bg-blue-400 w-full max-w-2xl mx-auto shadow-xl rounded-lg px-4 py-3 text-white">
          <div className="text-center text-2xl font-bold mb-3">
            <Link to="/status" className="pr-12 inline-flex hover:translate-y-px">
              🔙
            </Link>
            Welcome to Flight Status Notification Service
          </div>

          <form onSubmit={handleSubscribe} className="max-w-sm mx-auto">
            <div className="mb-5">
              <label
                htmlFor="dropdown"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Flight Number
              </label>
              <select
                id="dropdown"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={(e) => setDropdownData(e.target.value)}
                value={dropdownData}
                required
              >
                <option value="">Select Option</option>
                {flights && flights.length > 0 ? (
                  flights.map((flight) => (
                    <option key={flight.flight_id} value={flight.flight_id}>
                      {flight.flight_id}
                    </option>
                  ))
                ) : (
                  <option value="">Fetching Data</option>
                )}
              </select>
            </div>

            <div className="mb-5">
              <label
                htmlFor="number"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Contact Number
              </label>
              <input
                type="tel"
                id="number"
                value={phone}
                onChange={handleNumberValidation}
                placeholder="Phone"
                className={`bg-gray-50 border ${
                  message ? "border-red-600" : "border-gray-300"
                } text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                required
              />
              {message && (
                <p className="font-bold text-red-600">
                  {message}
                </p>
              )}
            </div>

            <div className="mb-5">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="example@gmail.com"
                required
              />
            </div>

            <div className="flex items-start justify-center mb-5">
              <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Subscribe
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Notifications;
