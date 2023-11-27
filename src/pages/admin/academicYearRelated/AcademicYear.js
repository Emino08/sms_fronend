import React, { useState } from "react";
import FeedBack from "../../../components/FeedBack";
import { useDispatch, useSelector } from "react-redux";
import { createAcademicYear } from "../../../redux/academicYearRelated/academicYearHandle";

const SelectAcademicYear = () => {
  const [selectedYear, setSelectedYear] = useState("Choose an academic year");
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const { academicYearsList } = useSelector((state) => state.academicYear);

  const academicYears = ["2022/2023", "2023/2024", "2024/2025", "2025/2026"];
  let date = {
    studentId: "32770",
    academicYearName: "2023/2024",
    payments: [
      {
        paymentDate: "2023-10-30",
        amountPaid: 500,
        receiptNumber: "RC001",
        paymentMethod: "Cash",
      },
    ],
  };

  const handleCreateAcademicYear = () => {
    const currentYear = new Date().getFullYear();
    const nextYear = currentYear + 1;
    const newAcademicYear = `${currentYear}/${nextYear}`;
    academicYears.push(newAcademicYear);
    setSelectedYear(newAcademicYear);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleSelectionChange = (e) => {
    console.log(e.target.value);
    dispatch(createAcademicYear({academicYearName:e.target.value}));
    setSelectedYear(e.target.value);
    setShowModal(true); // Show the modal when the selection changes
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white p-4 rounded-lg shadow-md max-w-md w-full text-center">
        <label
          htmlFor="academicYears"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Select an Academic Year
        </label>
        <select
          id="academicYears"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          value={selectedYear}
          onChange={handleSelectionChange} // Handle selection input change
        >
          <option value="Choose an academic year" disabled>
            Choose an academic year
          </option>
          {academicYears.map((year, index) => (
            <option key={index} value={year}>
              {year}
            </option>
          ))}
        </select>
        <button
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mt-2 dark:bg-blue-600 dark:hover-bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          onClick={handleCreateAcademicYear}
        >
          Create Academic Year
        </button>
      </div>
      {showModal && (
        <FeedBack
          message="Academic year updated successfully"
          isSuccess={true}
          onClose={handleModalClose}
        />
      )}
    </div>
  );
};

export default SelectAcademicYear;
