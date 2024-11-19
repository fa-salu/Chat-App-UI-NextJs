// src/pages/register.tsx
"use client";

import { useState } from "react";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = () => {
    // Handle registration logic here (e.g., API call)
    alert(`Registering: ${name}, ${email}`);
  };

  return (
    <div className="flex h-screen">
      {/* Left side chat content */}
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

      {/* Right side register form */}
      <div className="w-1/2 flex flex-col items-center justify-center p-10">
        <h2 className="text-3xl font-bold mb-8">Create an Account</h2>
        <div className="w-full max-w-sm">
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
            className="w-full bg-blue-600 text-white py-3 rounded-lg"
            onClick={handleRegister}
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
}
