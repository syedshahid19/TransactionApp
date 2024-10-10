import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from "react-hot-toast";
import debounce from "lodash.debounce";

const BASE_URL = process.env.REACT_APP_BASE_URL;

// Location and Service Arrays
const locations = ['India', 'USA', 'UK', 'China', 'Japan'];
const services = ['Investment Advice', 'Wealth Management', 'Financial Planning'];

const App = () => {
  const [transactions, setTransactions] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    location: '',
    amount: '',
    service: ''
  });

  useEffect(() => {
    axios.get(`${BASE_URL}/getTransactions`)
      .then(res => setTransactions(res.data))
      .catch(err => console.log(err));
  }, []);

  // Debounce to limit the number of requests sent to the backend
  const sendRealTimeLead = debounce(async (data) => {
    try {
      // Send lead data to backend in real-time (without form submission)
      await axios.post("http://localhost:4000/api/v1/user/createLead", data);
    } catch (error) {
      console.error("Error capturing lead in real-time:", error);
    }
  }, 1000);  // Delay of 1 second to avoid excessive requests

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const updatedLead = { ...formData, [name]: value };
    setFormData(updatedLead);

    // Only send real-time lead if all required fields are filled
    const { name: leadName, contact, location, amount, service } = updatedLead;
    if (leadName && contact && location && amount && service) {
      sendRealTimeLead(updatedLead);
    }
    console.log("updated form data", updatedLead);
  };

  const addTransaction = async (e) => {
    e.preventDefault();
    try {
      // Send transaction data to the Transaction backend (if applicable)
      const transactionResponse = await axios.post(`${BASE_URL}/addTransactions`, formData);
      
      // Prepare lead data for the LMS backend
      const leadData = {
        name: formData.name,
        contact: formData.contact,
        location: formData.location,
        service: formData.service,
        status: 'New', // Default status
      };
  
      // Send lead data to LMS backend
      await axios.post(`http://localhost:4000/api/v1/user/createLead`, leadData);
      
      // Update transactions state and reset form
      setTransactions([...transactions, transactionResponse.data]);
      resetForm();
  
      toast.success("Transaction Done and Lead Captured");
    } catch (err) {
      console.error(err);
      toast.error("Lead already exists.");
      resetForm();
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      contact: '',
      location: '',
      amount: '',
      service: ''
    });
  };

  return (
    <div className="container mx-auto p-6 mt-20">
      <h1 className="text-4xl font-bold text-center text-richblue-500 mb-8">
        Transaction Tracker
      </h1>

      {/* Form */}
      <form 
        onSubmit={addTransaction} 
        className="bg-white p-8 shadow-richblue-300 shadow-lg rounded-lg max-w-xl mx-auto space-y-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Name"
            className="border border-richblue-400 rounded p-3 text-lg focus:outline-none focus:border-richblue-500 transition-all"
            required
          />
          <input
            type="number"
            name="contact"
            value={formData.contact}
            onChange={handleInputChange}
            placeholder="Contact"
            className="border border-richblue-400 rounded p-3 text-lg focus:outline-none focus:border-richblue-500 transition-all"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Select for Location */}
          <select
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            className="border border-richblue-400 rounded p-3 text-lg focus:outline-none focus:border-richblue-500 transition-all"
            required
          >
            <option value="">Select Location</option>
            {locations.map((location, index) => (
              <option key={index} value={location}>
                {location}
              </option>
            ))}
          </select>

          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleInputChange}
            placeholder="Amount"
            className="border border-richblue-400 rounded p-3 text-lg focus:outline-none focus:border-richblue-500 transition-all"
            required
          />
        </div>

        {/* Select for Service */}
        <select
          name="service"
          value={formData.service}
          onChange={handleInputChange}
          className="border border-richblue-400 rounded p-3 text-lg w-full focus:outline-none focus:border-richblue-500 transition-all"
          required
        >
          <option value="">Select Service</option>
          {services.map((service, index) => (
            <option key={index} value={service}>
              {service}
            </option>
          ))}
        </select>

        {/* Submit and Cancel Buttons */}
        <div className="flex space-x-4">
          <button className="bg-caribbeangreen-200 hover:bg-caribbeangreen-300 text-white p-4 rounded-lg text-lg transition-all w-full shadow-md">
            Add Transaction
          </button>
          <button 
            type="button" 
            onClick={resetForm} 
            className="bg-gray-300 hover:bg-gray-400 text-black p-4 rounded-lg text-lg transition-all w-full shadow-md"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default App;
