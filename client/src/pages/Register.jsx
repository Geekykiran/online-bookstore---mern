import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/auth/register", { name, email, password });
      alert("Registration successful, please login.");
      navigate("/login");
    } catch (err) {
      console.error(err);
      alert("Registration failed.");
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-md">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" placeholder="Name" className="w-full p-2 border" value={name} onChange={(e) => setName(e.target.value)} required />
        <input type="email" placeholder="Email" className="w-full p-2 border" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" className="w-full p-2 border" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit" className="w-full bg-green-600 text-white p-2 rounded">Register</button>
      </form>
    </div>
  );
};

export default Register;
