// eslint-disable-next-line no-unused-vars
import React from 'react';
import { BiSolidMessageRoundedDots, BiLogOut } from 'react-icons/bi';
import { FaUserDoctor } from "react-icons/fa6";
import { IoPersonAddSharp } from 'react-icons/io5';
import { MdAddModerator } from 'react-icons/md';
import { SlLogin } from "react-icons/sl";
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:4000/logoutadmin', {
        method: 'GET', // Use 'POST' if your API expects it
        credentials: 'include', // Include cookies in the request
      });
      const result = await response.json();

      if (result.success) {
        // Redirect or perform any other actions after logout
        window.location.href = '/login'; // Redirect to login page
      } else {
        console.error('Logout failed:', result.message);
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <div id="view" className="flex min-h-screen flex-row">
      <div
        id="sidebar"
        className={`bg-white h-full md:block shadow-xl px-3 w-30 md:w-60 lg:w-60 overflow-x-hidden transition-transform duration-300 ease-in-out`}
      >
        <div className="space-y-6 md:space-y-10 mt-10">
          <h1 className="font-bold text-4xl text-center md:hidden">
            D<span className="text-teal-600">.</span>
          </h1>
          <h1 className="hidden md:block font-bold text-sm md:text-xl text-center">
            Dashwind<span className="text-teal-600">.</span>
          </h1>
          <div id="profile" className="space-y-3">
            <img
              src="https://img.freepik.com/premium-vector/teacher-with-full-shirt-vector-illustration_969863-21714.jpg?w=740"
              alt="Avatar user"
              className="w-10 md:w-16 rounded-full mx-auto"
            />
            <div>
              <h2 className="font-medium text-xs md:text-sm text-center text-teal-500">
                Muhammad Abubakar
              </h2>
              <p className="text-xs text-gray-500 text-center">Administrator</p>
            </div>
          </div>

          <div id="menu" className="flex flex-col space-y-2">
            <Link
              to="/"
              className="text-sm font-medium py-2 px-2 hover:bg-teal-500 hover:text-white hover:text-base rounded-md transition duration-150 ease-in-out flex items-center"
            >
              <svg
                className="w-6 h-6 fill-current mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                ></path>
              </svg>
              <span>Dashboard</span>
            </Link>
            <Link
              to="/login"
              className="text-sm font-medium py-2 px-2 hover:bg-teal-500 hover:text-white hover:scale-105 rounded-md transition duration-150 ease-in-out flex items-center"
            >
              <SlLogin className="w-6 h-6 fill-current mr-1" />
              <span>Login</span>
            </Link>
            <Link
              to="/doctors"
              className="text-sm font-medium py-2 px-2 hover:bg-teal-500 hover:text-white hover:scale-105 rounded-md transition duration-150 ease-in-out flex items-center"
            >
              <FaUserDoctor className="w-6 h-6 fill-current mr-1" />
              <span>Doctors</span>
            </Link>
            <Link
              to="/addnewadmin"
              className="text-sm font-medium py-2 px-2 hover:bg-teal-500 hover:text-white hover:scale-105 rounded-md transition duration-150 ease-in-out flex items-center"
            >
              <MdAddModerator className="w-6 h-6 fill-current mr-1" />
              <span>Add new Admin</span>
            </Link>
            <Link
              to="/messages"
              className="text-sm font-medium py-2 px-2 hover:bg-teal-500 hover:text-white hover:scale-105 rounded-md transition duration-150 ease-in-out flex items-center"
            >
              <BiSolidMessageRoundedDots className="w-6 h-6 fill-current mr-1" />
              <span>Messages</span>
            </Link>
            <Link
              to="/addnewdoctor"
              className="text-sm font-medium py-2 px-2 hover:bg-teal-500 hover:text-white hover:scale-105 rounded-md transition duration-150 ease-in-out flex items-center"
            >
              <IoPersonAddSharp className="w-6 h-6 fill-current mr-1" />
              <span>Add new Doctor</span>
            </Link>
            <button
              onClick={handleLogout}
              className="text-sm font-medium py-2 px-2 hover:bg-teal-500 hover:text-white hover:scale-105 rounded-md transition duration-150 ease-in-out flex items-center w-full text-left"
            >
              <BiLogOut className="w-6 h-6 fill-current mr-1" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
