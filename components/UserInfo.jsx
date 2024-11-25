"use client";
import { useEffect, useState } from "react";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { FaUser, FaEnvelope, FaMoneyBillWave, FaCalendarAlt, FaFileDownload, FaBell, FaPhoneAlt } from "react-icons/fa";
import { HiStatusOnline } from "react-icons/hi";
import { IoMdCreate } from "react-icons/io";
import { BsCheckCircle, BsFillXCircleFill } from "react-icons/bs";
import toast, { Toaster } from "react-hot-toast";

const UserInfo = () => {
  const { data: session } = useSession();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [menu, setMenu] = useState({});
  const [todayMenu, setTodayMenu] = useState({ breakfast: [], lunch: [], dinner: [] });

  // Static menu 
  const staticMenu = {
    monday: {
      breakfast: ["Poha", "Boiled Eggs", "Tea/Coffee"],
      lunch: ["Dal Tadka", "Jeera Rice", "Chapati", "Mixed Veg"],
      dinner: ["Paneer Butter Masala", "Rice", "Roti", "Salad"],
    },
    tuesday: {
      breakfast: ["Aloo Paratha", "Curd", "Tea/Coffee"],
      lunch: ["Rajma", "Steamed Rice", "Roti", "Cabbage Sabzi"],
      dinner: ["Chicken Curry", "Rice", "Roti", "Pickle"],
    },
    wednesday: {
      breakfast: ["Idli", "Sambar", "Coconut Chutney"],
      lunch: ["Chana Masala", "Rice", "Roti", "Lauki Sabzi"],
      dinner: ["Kofta Curry", "Rice", "Roti", "Salad"],
    },
    thursday: {
      breakfast: ["Upma", "Banana", "Tea/Coffee"],
      lunch: ["Dal Fry", "Steamed Rice", "Roti", "Aloo Methi"],
      dinner: ["Fish Curry", "Rice", "Roti", "Pickle"],
    },
    friday: {
      breakfast: ["Chole Bhature", "Lassi"],
      lunch: ["Mix Dal", "Rice", "Chapati", "Bhindi Fry"],
      dinner: ["Paneer Do Pyaza", "Rice", "Roti", "Cucumber Salad"],
    },
    saturday: {
      breakfast: ["Veg Sandwich", "Tea/Coffee"],
      lunch: ["Yellow Dal", "Steamed Rice", "Roti", "Cauliflower Curry"],
      dinner: ["Egg Curry", "Rice", "Roti", "Onion Salad"],
    },
    sunday: {
      breakfast: ["Masala Dosa", "Sambar", "Chutney"],
      lunch: ["Biryani", "Raita", "Papad"],
      dinner: ["Pasta", "Garlic Bread", "Soup"],
    },
  };

  useEffect(() => {
    setMenu(staticMenu);

    // Get the current day
    const today = currentDate.toLocaleString("en-US", { weekday: "long" }).toLowerCase();
    setTodayMenu(staticMenu[today] || { breakfast: [], lunch: [], dinner: [] });
  }, [currentDate]);

  const handleDownloadBill = () => {
    // Logic to download the monthly bill
    toast.success("Downloading Monthly Bill ...");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-blue-50 to-blue-200 p-6">
      <Toaster />
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header with User Details */}
        <div className="bg-white shadow-lg rounded-lg p-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-indigo-700">Welcome, {session?.user?.name || "User"}!</h1>
            <p className="text-gray-600">Email: {session?.user?.email || "Not Available"}</p>
            <div className="flex items-center gap-2 mt-3">
              <HiStatusOnline className="text-green-500 text-xl" />
              <span className="text-sm text-gray-500">Status: Active</span>
            </div>
          </div>
          <button
            onClick={() => signOut()}
            className="bg-red-500 hover:bg-red-600 text-white font-bold px-6 py-2 rounded-lg"
          >
            Log Out
          </button>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Calendar */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-bold text-indigo-700 mb-4">Calendar</h2>
            <Calendar
              value={currentDate}
              onChange={setCurrentDate}
              className="react-calendar m-2 p-2 md:mt-20"
              tileClassName={({ date, view }) =>
                view === "month" && date.toDateString() === new Date().toDateString()
                  ? "bg-indigo-600 text-white font-bold"
                  : ""
              }
            />
          </div>

          {/* Today's Menu */}
          <div className="bg-white shadow-lg rounded-lg p-6 md:col-span-1">
            <h2 className="text-xl font-bold text-indigo-700 mb-4">Menu for the Day</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-bold text-lg text-neutral-600">Breakfast 🍒</h3>
                <ul className="list-disc pl-6 text-gray-700">
                  {todayMenu.breakfast.length > 0 ? (
                    todayMenu.breakfast.map((item, index) => <li key={index}>{item}</li>)
                  ) : (
                    <li>No breakfast menu available</li>
                  )}
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-lg text-neutral-600">Lunch 🍛</h3>
                <ul className="list-disc pl-6 text-gray-700">
                  {todayMenu.lunch.length > 0 ? (
                    todayMenu.lunch.map((item, index) => <li key={index}>{item}</li>)
                  ) : (
                    <li>No lunch menu available</li>
                  )}
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-lg text-neutral-600">Dinner 🍜</h3>
                <ul className="list-disc pl-6 text-gray-700">
                  {todayMenu.dinner.length > 0 ? (
                    todayMenu.dinner.map((item, index) => <li key={index}>{item}</li>)
                  ) : (
                    <li>No dinner menu available</li>
                  )}
                </ul>
              </div>
            </div>
          </div>

          {/* Billed Amount */}
<div className="bg-white shadow-lg rounded-lg p-6">
  <h2 className="text-xl font-bold text-gray-700 mb-4">Total Billed Amount</h2>
  <p className="text-gray-700 font-semibold text-lg">₹ 1,234.56</p>
  
  {/* Billing Breakdown */}
  <div className="mt-4">
    <h3 className="font-semibold text-gray-600">Billing Breakdown</h3>
    <div className="space-y-2">
      <div className="flex justify-between">
        <span className="text-gray-600">Meal Charges:</span>
        <span className="text-gray-700">₹ 1,000.00</span>
      </div>
      <div className="flex justify-between">
        <span className="text-gray-600">Taxes:</span>
        <span className="text-gray-700">₹ 100.00</span>
      </div>
      <div className="flex justify-between">
        <span className="text-gray-600">Discounts:</span>
        <span className="text-gray-700">- ₹ 50.00</span>
      </div>
      <div className="flex justify-between font-bold">
        <span className="text-gray-600">Total Billed:</span>
        <span className="text-gray-800">₹ 1,234.56</span>
      </div>
    </div>
  </div>

  {/* Payment Status */}
  <div className="mt-4">
    <h3 className="font-semibold text-gray-600">Payment Status</h3>
    <div className="flex items-center gap-2">
      <span className="text-gray-700">Paid: </span>
      <span className="text-green-600 font-semibold">₹ 1,000.00</span>
    </div>
    <div className="flex items-center gap-2 mt-2">
      <span className="text-gray-700">Remaining Balance: </span>
      <span className="text-red-600 font-semibold">₹ 234.56</span>
    </div>
  </div>

  {/* Payment Due Date */}
  <div className="mt-4">
    <h3 className="font-semibold text-gray-600">Payment Due Date</h3>
    <p className="text-gray-700">December 5, 2024</p>
  </div>

  {/* Download Bill Button */}
  <button
    onClick={handleDownloadBill}
    className="mt-4 bg-blue-800 text-white py-2 px-6 rounded-lg hover:bg-blue-900 flex items-center"
  >
    <FaFileDownload className="mr-2" /> Download Monthly Bill
  </button>
</div>

        </div>

        {/* Additional User Details and Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* User Details */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-bold text-gray-700 mb-4">User Details</h2>
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <FaUser className="text-indigo-600 text-xl" />
                <span className="font-semibold">Name:</span> {session?.user?.name || "Not Available"}
              </div>
              <div className="flex items-center gap-3">
                <FaEnvelope className="text-indigo-600 text-xl" />
                <span className="font-semibold">Email:</span> {session?.user?.email || "Not Available"}
              </div>
              <div className="flex items-center gap-3">
              <FaPhoneAlt className="text-indigo-600 text-xl" />
                <span className="font-semibold">Phone:</span> {session?.user?.phone || "Not Available"}
              </div>
              <div className="flex items-center gap-3">
                <IoMdCreate className="text-indigo-600 text-xl" />
                <span className="font-semibold">Account Created:</span> {session?.user?.created_at || "Not Available"}
              </div>
              <div className="flex items-center gap-3">
                <FaBell className="text-indigo-600 text-xl" />
                <span className="font-semibold">Notifications:</span> You have 3 new notifications
              </div>
            </div>
          </div>

          {/* Statistics & Progress */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-bold text-gray-700 mb-4">Statistics</h2>
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <FaMoneyBillWave className="text-indigo-600 text-xl" />
                <span className="font-semibold">Coupons Redeemed:</span> 5
              </div>
              <div className="flex items-center gap-3">
                <FaCalendarAlt className="text-indigo-600 text-xl" />
                <span className="font-semibold">Next Event:</span> Dec 15, 2024
              </div>
              {/* Activity Progress */}
              <div>
                <h3 className="font-bold text-lg text-neutral-600">Meal Plan Progress</h3>
                <div className="flex items-center gap-2">
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-green-600 h-2.5 rounded-full" style={{ width: "70%" }}></div>
                  </div>
                  <span className="text-sm text-gray-600">70% Completed</span>
                </div>
              </div>
              {/* Recent Transactions */}
              <div>
                <h3 className="font-bold text-lg text-neutral-600">Recent Transactions</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <BsCheckCircle className="text-green-500" />
                    <span className="text-sm text-gray-700">Bill Payment - ₹500 - Nov 20, 2024</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <BsFillXCircleFill className="text-red-500" />
                    <span className="text-sm text-gray-700">Refund - ₹100 - Nov 18, 2024</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <BsCheckCircle className="text-green-500" />
                    <span className="text-sm text-gray-700">Bill Payment - ₹300 - Nov 15, 2024</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;

