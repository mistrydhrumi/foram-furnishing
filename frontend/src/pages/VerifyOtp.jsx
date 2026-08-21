import React,{useState} from "react";
import axios from "axios";
import { useLocation,useNavigate } from "react-router-dom";

const VerifyOtp = () => {

  const [otp,setOtp] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email;

  const handleVerify = async(e) =>{
    e.preventDefault();

    try {

      const res = await axios.post(
        `${import.meta.env.VITE_URL}/api/v1/user/verify-otp`,
        {email,otp}
      );

      if(res.data.success){
        alert("OTP Verified");
        navigate("/change-password",{state:{email}});
      }

    } catch (error) {
      alert("Invalid OTP");
    }

  }

  return (

    <div className="flex justify-center items-center h-screen">

      <form onSubmit={handleVerify} className="bg-white p-6 shadow-lg">

        <h2 className="text-xl font-bold mb-4">Verify OTP</h2>

        <input
          type="text"
          placeholder="Enter 6 digit OTP"
          className="border p-2 w-full mb-4"
          value={otp}
          onChange={(e)=>setOtp(e.target.value)}
        />

        <button className="bg-green-500 text-white w-full py-2">
          Verify OTP
        </button>

      </form>

    </div>
  );

};

export default VerifyOtp;