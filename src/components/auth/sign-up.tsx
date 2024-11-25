"use client";

import { useState } from "react";
import { axiosInstance } from "@/utils/axios";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      
      const response = await axiosInstance.post("http://localhost:5000/api/auth/register", {
        username: name, 
        email,
        password,
      });

      if (response.status === 201) { 
        alert("Registration successful! Please log in.");
        window.location.href = "/signin"; 
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      
      if (error.response) {
        
        alert(`Registration failed: ${error.response.data.message || "An error occurred"}`);
      } else if (error.request) {
        
        alert("No response from server. Please try again later.");
      } else {
        
        alert("An error occurred. Please try again.");
      }
      console.error("Error during registration:", error);
    }
  };

  return (
    <div className="flex h-screen">
      <div className="w-1/2 bg-blue-600 text-white flex flex-col items-center justify-center p-10">
        <h1 className="text-4xl font-bold mb-4">Welcome to ChatApp!</h1>
        <p className="text-lg mb-6">
          Connect with your friends and family using our real-time chat
          application. Sign up now to get started!
        </p>
        <img
          src="/chat-illustration.png"
          alt="Chat Illustration"
          className="w-3/4"
        />
      </div>

      <div className="w-1/2 flex flex-col items-center justify-center p-10">
        <h2 className="text-3xl font-bold mb-8">Create an Account</h2>
        <form className="w-full max-w-sm" onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Name"
            className="w-full p-3 mb-4 border rounded-lg"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 mb-4 border rounded-lg"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 mb-6 border rounded-lg"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
