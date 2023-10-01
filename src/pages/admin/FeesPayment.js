import React, { useState } from "react";
import FeePaymentForm from "./FeePaymentForm"; // Import your FeePaymentForm component here
import FeePaymentReport from "./FeePaymentReport"; // Import your FeePaymentReport component here

const TabbedInterface = () => {
  const [activeTab, setActiveTab] = useState("feesPaymentForm");

  const tabClickHandler = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <div className="container mx-auto mt-8">
      <div className="flowbite bg-white border rounded-lg shadow-xl">
        <div className="flowbite-tabs">
          <ul className="flex">
            <li
              onClick={() => tabClickHandler("feesPaymentForm")}
              className={`cursor-pointer p-4 ${
                activeTab === "feesPaymentForm"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700"
              } hover:bg-blue-500 hover:text-white transition-all duration-200`}
            >
              Fee Payment Form
            </li>
            <li
              onClick={() => tabClickHandler("feesPaymentReport")}
              className={`cursor-pointer p-4 ${
                activeTab === "feesPaymentReport"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700"
              } hover:bg-blue-500 hover:text-white transition-all duration-200`}
            >
              Fee Payment Report
            </li>
          </ul>
        </div>
        <div className="flowbite-tab-content">
          {activeTab === "feesPaymentForm" && <FeePaymentForm />}
          {activeTab === "feesPaymentReport" && <FeePaymentReport />}
        </div>
      </div>
    </div>
  );
};

export default TabbedInterface;
