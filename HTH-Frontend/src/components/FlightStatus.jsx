// FlightStatus.js

import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const FlightStatus = ({ flights = [] }) => {
  // const [flights, setFlights] = useState([]);

  // useEffect(() => {
  //   axios
  //     .get("http://127.0.0.1:5000/api/flights")
  //     .then((response) => setFlights(response.data))
  //     .catch((error) => console.error("Error fetching flight data:", error));
  // }, []);

  return (
    <>
      <div className="bg-blue-900  min-h-screen py-8">
        <div className="bg-blue-400 vw-full max-w-2xl mx-auto shadow-xl rounded-lg px-4 py-3 text-white">
          <h1 className=" text-center text-3xl font-bold mb-3">
            Flight Status
          </h1>
          <hr></hr>
          <div className="mt-3">
            {/* <ul>
            {flights.map((flight) => (
              <li key={flight.id}>
                {flight.number} - {flight.status}
              </li>
            ))}
          </ul> */}
            <div className="mt-6 flex flex-col ">
              <div className="-mx-4 -my-2 overflow-y-auto  sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                  <div
                    className={`border border-gray-200 md:rounded-lg ${
                      flights.length > 10
                        ? "max-h-96 overflow-y-scroll"
                        : "overflow-hidden"
                    }`}
                  >
                    <table className="min-w-full divide-y divide-gray-200 ">
                      <thead className="bg-gray-50">
                        <tr className="divide-x divide-gray-200">
                          <th
                            scope="col"
                            className="px-4 text-center py-3.5  text-md font-normal  text-gray-500"
                          >
                            airline
                          </th>
                          <th
                            scope="col"
                            className="px-4 text-center py-3.5  text-md font-normal  text-gray-500"
                          >
                            Flight Number
                          </th>
                          <th
                            scope="col"
                            className="px-4 text-center py-3.5  text-md font-normal  text-gray-500"
                          >
                            Status
                          </th>
                          <th
                            scope="col"
                            className="px-4 text-center py-3.5  text-md font-normal  text-gray-500"
                          >
                            arrival_gate
                          </th>
                          <th
                            scope="col"
                            className="px-4 text-center py-3.5  text-md font-normal  text-gray-500"
                          >
                            departure_gate
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 bg-white">
                        {flights && flights.length > 0 ? (
                          flights.map(
                            (flight) =>
                              flight && (
                                <tr
                                  className="text-black divide-x divide-gray-200"
                                  key={flight.flight_id}
                                >
                                  <td className="whitespace-nowrap px-4 py-4 text-center">
                                    {flight.airline}
                                  </td>
                                  <td className="whitespace-nowrap px-4 py-4 text-center">
                                    {flight.flight_id}
                                  </td>
                                  <td
                                    className={`${
                                      flight.status === "Cancelled"
                                        ? "text-red-700 font-bold"
                                        : ""
                                    } whitespace-nowrap px-4 py-4 text-center`}
                                  >
                                    {flight.status}
                                  </td>
                                  <td className="whitespace-nowrap px-4 py-4 text-center">
                                    {flight.arrival_gate}
                                  </td>
                                  <td className="whitespace-nowrap px-4 py-4 text-center">
                                    {flight.departure_gate}
                                  </td>
                                </tr>
                              )
                          )
                        ) : (
                          <tr>
                            <td
                              colSpan="2"
                              className="whitespace-nowrap px-4 py-4 text-center text-gray-500"
                            >
                              No flight data available
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                  {/* notification button */}
                  <div className="flex flex-col items-center">
                    <Link to="/notification">
                      <button className="mt-3 rounded-sm p-1 text-xl border border-black/10 bg-red-400 hover:bg-red-900">
                        Get Flight Status Notification
                      </button>
                    </Link>
                  </div>

                  {/* End Notification button */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

FlightStatus.propTypes = {
  flights: PropTypes.array.isRequired,
};

FlightStatus.defaultProps = {
  flights: [],
};
export default FlightStatus;
