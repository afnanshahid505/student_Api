import { useState } from "react";
import {Link, useNavigate}from "react-router-dom";
import axios from "axios";
export default function Login(){
  const navigate=useNavigate();
    const [formData,setFormData]=useState({
        email:" ",
        password:" ",

    });
    const handleChange= (e)=>{
        setFormData({
            ...formData,[e.target.name]: e.target.value,
        });
    }
     const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      const response = await axios.post("http://localhost:5000/auth/login",
        formData);
        localStorage.setItem("token", response.data.token);

      alert("Login successful ");

      navigate("/dashboard");
    }
    catch(error){
      console.log("FULL LOGIN ERROR:", error);
    console.log("BACKEND MESSAGE:", error.response?.data);
       alert(error.response?.data?.message || "Login failed");
    }
  
  };
    return(
         <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">
        <h1 className="text-3xl font-bold text-center mb-6">
          Teacher Login
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-black"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block mb-1 font-medium">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-black"
              required
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-xl hover:opacity-90 transition"
          >
            Login
          </button>
        </form>

        <p className="text-center mt-4">
          Don’t have an account?{" "}
          <Link to="/" className="text-blue-600 font-semibold">
            Signup
          </Link>
        </p>
      </div>
    </div>
    )
};