import React,{useState} from "react";
import axios from "axios";
import { useLocation,useNavigate } from "react-router-dom";

const ChangePassword = () => {

  const [password,setPassword] = useState("");
  const navigate = useNavigate();

  const location = useLocation();
  const email = location.state?.email;

  const handleChange = async(e)=>{
    e.preventDefault();

    try {

      const res = await axios.post(
        `${import.meta.env.VITE_URL}/api/v1/user/change-password`,
        {email,password}
      );

      if(res.data.success){
        alert("Password changed successfully");
        navigate("/login");
      }

    } catch (error) {
      alert("Error changing password");
    }

  }

  return (

    <div className="flex justify-center items-center h-screen">

      <form onSubmit={handleChange} className="bg-white p-6 shadow-lg">

        <h2 className="text-xl font-bold mb-4">Change Password</h2>

        <input
          type="password"
          placeholder="Enter New Password"
          className="border p-2 w-full mb-4"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
        />

        <button className="bg-purple-500 text-white w-full py-2">
          Update Password
        </button>

      </form>

    </div>
  );
};

export default ChangePassword;