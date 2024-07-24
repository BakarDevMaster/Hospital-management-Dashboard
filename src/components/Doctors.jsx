// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';

const DoctorsList = () => {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch('http://localhost:4000/getdoctors',{
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include', // This will ensure cookies are sent with the request
          
        });
        const data = await response.json();
        console.log(data); // Debugging line to inspect data
        setDoctors(Array.isArray(data.doctors) ? data.doctors : []); // Ensure it's an array
      } catch (error) {
        console.error('Error fetching doctors:', error);
        setDoctors([]); // Set an empty array on error
      }
    };

    fetchDoctors();
  }, []);

  if (doctors.length === 0) {
    return <div className="text-center text-gray-600">No doctors found.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Doctors List</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {doctors.map((doctor) => (
          <div key={doctor._id} className="bg-gradient-to-r from-cyan-400 to-blue-500 p-2 rounded-lg shadow-lg hover:shadow-2xl transform transition-transform duration-300 hover:scale-105">
            <div className="bg-white p-4 rounded-lg overflow-hidden flex flex-col items-center">
              <img
                src={doctor.docAvatar.url}
                alt={`${doctor.firstname} ${doctor.lastname}`}
                className="w-32 h-32 rounded-full border-4 border-cyan-600 shadow-lg"
              />
              <div className="text-center mt-4">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  Dr. {doctor.firstname} {doctor.lastname}
                </h2>
                <p className="text-gray-800 font-semibold">{doctor.role}</p>
                <p className="text-gray-800 font-semibold">{doctor.doctorDepartment}</p>
                <p className="text-gray-800 font-semibold">Email: <span className="text-gray-600">{doctor.email}</span></p>
                <p className="text-gray-800 font-semibold">Phone: <span className="text-gray-600">{doctor.phone}</span></p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorsList;
