// eslint-disable-next-line no-unused-vars
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { context } from "../main";

const AddNewDoctor = () => {
  const navigate = useNavigate();
  const { setIsAuthenticated } = useContext(context);
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    nic: "",
    dob: "",
    gender: "",
    password: "",
    confirmPassword: "",
    doctorDepartment: "",
    docAvatar: null,
  });
  const [errors, setErrors] = useState({});

  const departments = ['Cardiology', 'Neurology', 'Pediatrics', 'Radiology', 'Surgery'];

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'docAvatar') {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const {
      firstname,
      lastname,
      email,
      phone,
      nic,
      dob,
      gender,
      password,
      doctorDepartment,
      docAvatar
    } = formData;

    if (!firstname) newErrors.firstname = "First name is required";
    if (!lastname) newErrors.lastname = "Last name is required";
    if (!email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Email is invalid";
    if (!phone) newErrors.phone = "Phone is required";
    if (!nic) newErrors.nic = "NIC is required";
    if (!dob) newErrors.dob = "Date of birth is required";
    if (!gender) newErrors.gender = "Gender is required";
    if (!password) newErrors.password = "Password is required";
    else if (password.length < 8)
      newErrors.password = "Password must be at least 8 characters long";
    if (!doctorDepartment) newErrors.doctorDepartment = "Doctor department is required";
    if (!docAvatar) newErrors.docAvatar = "Avatar is required";

    return newErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach(key => {
        formDataToSend.append(key, formData[key]);
      });

      const response = await fetch("http://localhost:4000/addnewdoctor", {
        method: "POST",
        body: formDataToSend,
        credentials: 'include'
      });

      const result = await response.json();
      console.log("Result:", result);
      if (response.ok) {
        console.log("Doctor created successfully:", result);
        setFormData({
          firstname: "",
          lastname: "",
          email: "",
          phone: "",
          nic: "",
          dob: "",
          gender: "",
          password: "",
          confirmPassword: "",
          doctorDepartment: "",
          docAvatar: null,
        });
        toast.success(result.message);
        setIsAuthenticated(true);
        navigate("/");
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error("Error:", error);
    }
  };

  return (
    <div className="flex justify-center items-center py-4 min-h-screen px-2">
      <div className="w-full max-w-3xl px-6 py-8 bg-white rounded-lg">
        <h3 className="text-2xl text-center text-cyan-400 font-bold mb-6">
          Add New Doctor!
        </h3>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="md:flex md:justify-between">
            <div className="md:w-1/2 md:mr-2">
              <label
                className="block mb-2 text-sm font-bold text-gray-700"
                htmlFor="firstname"
              >
                Firstname
              </label>
              <input
                className={`w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline ${
                  errors.firstname && "border-red-500"
                }`}
                id="firstname"
                type="text"
                name="firstname"
                placeholder="Firstname"
                value={formData.firstname}
                onChange={handleChange}
              />
              {errors.firstname && (
                <p className="text-red-500 text-xs italic">
                  {errors.firstname}
                </p>
              )}
            </div>
            <div className="md:w-1/2 md:ml-2">
              <label
                className="block mb-2 text-sm font-bold text-gray-700"
                htmlFor="lastname"
              >
                Lastname
              </label>
              <input
                className={`w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline ${
                  errors.lastname && "border-red-500"
                }`}
                id="lastname"
                type="text"
                name="lastname"
                placeholder="Lastname"
                value={formData.lastname}
                onChange={handleChange}
              />
              {errors.lastname && (
                <p className="text-red-500 text-xs italic">{errors.lastname}</p>
              )}
            </div>
          </div>
          <div>
            <label
              className="block mb-2 text-sm font-bold text-gray-700"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className={`w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline ${
                errors.email && "border-red-500"
              }`}
              id="email"
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && (
              <p className="text-red-500 text-xs italic">{errors.email}</p>
            )}
          </div>
          <div className="md:flex md:justify-between">
            <div className="md:w-1/2 md:mr-2">
              <label
                className="block mb-2 text-sm font-bold text-gray-700"
                htmlFor="phone"
              >
                Phone
              </label>
              <input
                className={`w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline ${
                  errors.phone && "border-red-500"
                }`}
                id="phone"
                type="text"
                name="phone"
                placeholder="Phone"
                value={formData.phone}
                onChange={handleChange}
              />
              {errors.phone && (
                <p className="text-red-500 text-xs italic">{errors.phone}</p>
              )}
            </div>
            <div className="md:w-1/2 md:ml-2">
              <label
                className="block mb-2 text-sm font-bold text-gray-700"
                htmlFor="nic"
              >
                NIC
              </label>
              <input
                className={`w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline ${
                  errors.nic && "border-red-500"
                }`}
                id="nic"
                type="text"
                name="nic"
                placeholder="NIC"
                value={formData.nic}
                onChange={handleChange}
              />
              {errors.nic && (
                <p className="text-red-500 text-xs italic">{errors.nic}</p>
              )}
            </div>
          </div>
          <div className="md:flex md:justify-between">
            <div className="md:w-1/2 md:mr-2">
              <label
                className="block mb-2 text-sm font-bold text-gray-700"
                htmlFor="dob"
              >
                Date of Birth
              </label>
              <input
                className={`w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline ${
                  errors.dob && "border-red-500"
                }`}
                id="dob"
                type="date"
                name="dob"
                placeholder="Date of Birth"
                value={formData.dob}
                onChange={handleChange}
              />
              {errors.dob && (
                <p className="text-red-500 text-xs italic">{errors.dob}</p>
              )}
            </div>
            <div className="md:w-1/2 md:ml-2">
              <label
                className="block mb-2 text-sm font-bold text-gray-700"
                htmlFor="gender"
              >
                Gender
              </label>
              <select
                className={`w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline ${
                  errors.gender && "border-red-500"
                }`}
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
              {errors.gender && (
                <p className="text-red-500 text-xs italic">{errors.gender}</p>
              )}
            </div>
          </div>
          <div className="md:flex md:justify-between">
            <div className="md:w-1/2 md:mr-2">
              <label
                className="block mb-2 text-sm font-bold text-gray-700"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className={`w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline ${
                  errors.password && "border-red-500"
                }`}
                id="password"
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
              {errors.password && (
                <p className="text-red-500 text-xs italic">
                  {errors.password}
                </p>
              )}
            </div>
            <div className="md:w-1/2 md:ml-2">
              <label
                className="block mb-2 text-sm font-bold text-gray-700"
                htmlFor="confirmPassword"
              >
                Confirm Password
              </label>
              <input
                className={`w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline ${
                  errors.confirmPassword && "border-red-500"
                }`}
                id="confirmPassword"
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs italic">
                  {errors.confirmPassword}
                </p>
              )}
            </div>
          </div>
          <div>
            <label
              className="block mb-2 text-sm font-bold text-gray-700"
              htmlFor="doctorDepartment"
            >
              Doctor Department
            </label>
            <select
              className={`w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline ${
                errors.doctorDepartment && "border-red-500"
              }`}
              id="doctorDepartment"
              name="doctorDepartment"
              value={formData.doctorDepartment}
              onChange={handleChange}
            >
              <option value="">Select Department</option>
              {departments.map(department => (
                <option key={department} value={department}>
                  {department}
                </option>
              ))}
            </select>
            {errors.doctorDepartment && (
              <p className="text-red-500 text-xs italic">
                {errors.doctorDepartment}
              </p>
            )}
          </div>
          <div>
            <label
              className="block mb-2 text-sm font-bold text-gray-700"
              htmlFor="docAvatar"
            >
              Avatar
            </label>
            <input
              className={`w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline ${
                errors.docAvatar && "border-red-500"
              }`}
              id="docAvatar"
              type="file"
              name="docAvatar"
              accept="image/*"
              onChange={handleChange}
            />
            {errors.docAvatar && (
              <p className="text-red-500 text-xs italic">{errors.docAvatar}</p>
            )}
          </div>
          <div className="text-center">
            <button
              className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Add Doctor
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNewDoctor;
