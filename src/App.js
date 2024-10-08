import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from "react-hot-toast";

const BASE_URL = process.env.REACT_APP_BASE_URL;

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const addTransaction = (e) => {
    e.preventDefault();
    axios.post(`${BASE_URL}/addTransactions`, formData)
      .then(res => {
        setTransactions([...transactions, res.data]);
        setFormData({
          name: '',
          contact: '',
          location: '',
          amount: '',
          service: ''
        });
        toast.success("Transcation Done")
      })
      .catch(err => console.log(err));
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
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            placeholder="Location"
            className="border border-richblue-400 rounded p-3 text-lg focus:outline-none focus:border-richblue-500 transition-all"
            required
          />
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

        <input
          type="text"
          name="service"
          value={formData.service}
          onChange={handleInputChange}
          placeholder="Service"
          className="border border-richblue-400 rounded p-3 text-lg w-full focus:outline-none focus:border-richblue-500 transition-all"
          required
        />

        <button className="bg-caribbeangreen-200 hover:bg-caribbeangreen-300 text-white p-4 rounded-lg text-lg transition-all w-full shadow-md">
          Add Transaction
        </button>
      </form>
    </div>
  );
};

export default App;
