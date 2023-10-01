import React, { useState, useEffect } from "react";
import axios from "axios";

const FeePaymentPage = () => {
  const [selectedFilter, setSelectedFilter] = useState("full");
  const [selectedClass, setSelectedClass] = useState("");
  const [paymentReport, setPaymentReport] = useState([]);
  const [classList, setClassList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch the list of available classes
  useEffect(() => {
    const fetchClassList = async () => {
      try {
        const response = await axios.get("/api/classes");
        setClassList(response.data);
      } catch (error) {
        console.error("Error fetching class list:", error);
      }
    };

    fetchClassList().then((r) => console.log(r));
  }, []);
  // Fetch the payment report based on the selected filter and class
  useEffect(() => {
    const fetchPaymentReport = async () => {
      try {
        let response;
        switch (selectedFilter) {
          case "full":
            response = await axios.get(
              `/api/fees/full-payment-report/class/${selectedClass}`,
            );
            break;
          case "first":
            response = await axios.get(
              `/api/fees/first-term-payment-report/class/${selectedClass}`,
            );
            break;
          case "second":
            response = await axios.get(
              `/api/fees/second-term-payment-report/class/${selectedClass}`,
            );
            break;
          case "third":
            response = await axios.get(
              `/api/fees/third-term-payment-report/class/${selectedClass}`,
            );
            break;
          default:
            response = await axios.get(
              "/api/fees/full-payment-report/class/${selectedClass}",
            );
            break;
        }

        setPaymentReport(response.data);
      } catch (error) {
        console.error("Error fetching payment report:", error);
      }
    };

    fetchPaymentReport().then((r) => console.log(r));
  }, [selectedFilter, selectedClass]);

  const handleSearch = async (e) => {
    e.preventDefault(); // Prevent the form from submitting and causing a page refresh

    try {
      if (searchQuery.trim() === "") {
        return;
      }

      const response = await axios.get(`/api/students/search/${searchQuery}`);

      if (response.data) {
        setPaymentReport([response.data]);
      } else {
        setPaymentReport([]);
        console.log("Student not found");
      }
    } catch (error) {
      console.error("Error searching for student:", error);
    }
  };
  return (
    <div>
      <h1>Fee Payment Report</h1>
      <div>
        <form onSubmit={handleSearch}>
          <label
            htmlFor="default-search"
            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search Mockups, Logos..."
              required
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              type="submit"
              className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Search
            </button>
          </div>
        </form>
      </div>

      <div>
        <label>Filter by Payment Type:</label>
        <select
          value={selectedFilter}
          onChange={(e) => setSelectedFilter(e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option value="full">Full Payment</option>
          <option value="first">First Term Payment</option>
          <option value="second">Second Term Payment</option>
          <option value="third">Third Term Payment</option>
        </select>
      </div>
      <div>
        <label>Filter by Class:</label>
        <select
          value={selectedClass}
          onChange={(e) => setSelectedClass(e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option value="">All Classes</option>
          {classList.map((classItem) => (
            <option key={classItem._id} value={classItem._id}>
              {classItem.sclassName}
            </option>
          ))}
        </select>
      </div>
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead>
          <tr>
            <th>Name</th>
            <th>Roll Number</th>
            <th>Total Paid</th>
          </tr>
        </thead>
        <tbody>
          {paymentReport.map((student) => (
            <tr key={student._id}>
              <td>{student.name}</td>
              <td>{student.rollNum}</td>
              <td>{student.totalPaid}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FeePaymentPage;
