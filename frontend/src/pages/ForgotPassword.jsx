import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {

  const [email,setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async(e) =>{
    e.preventDefault();

    try {

      const res = await axios.post(
        `${import.meta.env.VITE_URL}/api/v1/user/forgot-password`,
        {email}
      );

      if(res.data.success){
        alert("OTP sent to email");
        navigate("/verify-otp",{state:{email}});
      }

    } catch (error) {
      alert(error.response?.data?.message);
    }

  }

  return (
    <div className="flex justify-center items-center h-screen">

      <form onSubmit={handleSubmit} className="bg-white p-6 shadow-lg">

        <h2 className="text-xl font-bold mb-4">Forgot Password</h2>

        <input
          type="email"
          placeholder="Enter Email"
          className="border p-2 w-full mb-4"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
        />

        <button className="bg-blue-500 text-white w-full py-2">
          Send OTP
        </button>

      </form>

    </div>
  );
};

export default ForgotPassword;