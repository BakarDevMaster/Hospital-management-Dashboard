// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';

const Dashboard = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch('http://localhost:4000/appointments',{
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include', // This will ensure cookies are sent with the request
          
        });
        const data = await response.json();
        setAppointments(data.appointments); // Adjust according to the actual structure of your API response
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };

    fetchAppointments();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Appointments Dashboard</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="px-6 py-3 border-b">First Name</th>
              <th className="px-6 py-3 border-b">Last Name</th>
              <th className="px-6 py-3 border-b">Email</th>
              <th className="px-6 py-3 border-b">Phone</th>
              <th className="px-6 py-3 border-b">DOB</th>
              <th className="px-6 py-3 border-b">Gender</th>
              <th className="px-6 py-3 border-b">Appointment Date</th>
              <th className="px-6 py-3 border-b">Doctor Department</th>
              <th className="px-6 py-3 border-b">Doctor Name</th>
              <th className="px-6 py-3 border-b">Address</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment) => (
              <tr key={appointment._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 border-b">{appointment.firstname}</td>
                <td className="px-6 py-4 border-b">{appointment.lastname}</td>
                <td className="px-6 py-4 border-b">{appointment.email}</td>
                <td className="px-6 py-4 border-b">{appointment.phone}</td>
                <td className="px-6 py-4 border-b">{new Date(appointment.dob).toLocaleDateString()}</td>
                <td className="px-6 py-4 border-b">{appointment.gender}</td>
                <td className="px-6 py-4 border-b">{new Date(appointment.appointmentdate).toLocaleDateString()}</td>
                <td className="px-6 py-4 border-b">{appointment.doctordepartment}</td>
                <td className="px-6 py-4 border-b">{appointment.doctorname}</td>
                <td className="px-6 py-4 border-b">{appointment.address}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
