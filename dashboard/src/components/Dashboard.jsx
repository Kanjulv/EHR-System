import React, { useContext, useEffect, useState } from "react";
import { Context } from "../main";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { GoCheckCircleFill } from "react-icons/go";
import { AiFillCloseCircle } from "react-icons/ai";

const Dashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);  // New state to manage doctors
  const { isAuthenticated, admin } = useContext(Context);

  console.log("isAuthenticated:", isAuthenticated);
  console.log("admin:", admin);

  // Fetch appointments and doctors
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4000/api/v1/appointment/getall",
          { withCredentials: true }
        );
        console.log("Fetched Appointments:", data.appointments);
        setAppointments(data.appointments || []);
      } catch (error) {
        console.error("Error fetching appointments:", error);
        setAppointments([]);
        toast.error("Failed to load appointments.");
      }
    };

    const fetchDoctors = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4000/api/v1/doctor/getall",  // Assuming there's an endpoint for fetching doctors
          { withCredentials: true }
        );
        console.log("Fetched Doctors:", data.doctors);
        setDoctors(data.doctors || []);
      } catch (error) {
        console.error("Error fetching doctors:", error);
        setDoctors([]);
        toast.error("Failed to load doctors.");
      }
    };

    fetchAppointments();
    fetchDoctors();
  }, []);

  if (!isAuthenticated) {
    toast.warn("Not authenticated. Redirecting to login.");
    return <Navigate to={"/login"} />;
  }

  const handleAddAppointment = () => {
    // Logic to add appointment (could show a modal or redirect to an appointment creation page)
    console.log("Redirecting to appointment creation page...");
  };

  const handleAddDoctor = () => {
    // Logic to add doctor (could show a modal or redirect to a doctor registration page)
    console.log("Redirecting to doctor registration page...");
  };

  return (
    <section className="dashboard page">
      {/* Admin Banner */}
      <div className="banner">
        <div className="firstBox">
          <img src="/doc.png" alt="docImg" />
          <div className="content">
            <div>
              <p>Hello,</p>
              <h5>{admin && `${admin.firstName} ${admin.lastName}`}</h5>
            </div>
            <p>
              Welcome to your dashboard. Manage appointments, update statuses,
              and keep track of the medical workflow seamlessly.
            </p>
          </div>
        </div>
        <div className="secondBox">
          <p>Total Appointments</p>
          <h3>{appointments.length}</h3>
        </div>
        <div className="thirdBox">
          <p>Registered Doctors</p>
          <h3>{doctors.length > 0 ? doctors.length : 'No Doctors Yet'}</h3>
        </div>
      </div>

      {/* Add Appointment and Doctor buttons */}
      <div className="actions">
        <button onClick={handleAddAppointment}>Add Appointment</button>
        <button onClick={handleAddDoctor}>Register Doctor</button>
      </div>

      {/* Appointments Section */}
      <div className="banner">
        <h5>Appointments</h5>
        <table>
          <thead>
            <tr>
              <th>Patient</th>
              <th>Date</th>
              <th>Doctor</th>
              <th>Department</th>
              <th>Status</th>
              <th>Visited</th>
            </tr>
          </thead>
          <tbody>
            {appointments && appointments.length > 0 ? (
              appointments.map((appointment) => (
                <tr key={appointment._id}>
                  <td>
                    {`${appointment.firstName} ${appointment.lastName}`}
                  </td>
                  <td>
                    {appointment.appointment_date
                      ? appointment.appointment_date.substring(0, 16)
                      : 'N/A'}
                  </td>
                  <td>
                    {appointment.doctor
                      ? `${appointment.doctor.firstName} ${appointment.doctor.lastName}`
                      : 'No Doctor Assigned'}
                  </td>
                  <td>{appointment.department}</td>
                  <td>
                    <select
                      value={appointment.status}
                      onChange={(e) =>
                        handleUpdateStatus(appointment._id, e.target.value)
                      }
                    >
                      <option value="Pending">Pending</option>
                      <option value="Accepted">Accepted</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                  </td>
                  <td>
                    {appointment.hasVisited ? (
                      <GoCheckCircleFill className="green" />
                    ) : (
                      <AiFillCloseCircle className="red" />
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">No Appointments Found!</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Dashboard;
