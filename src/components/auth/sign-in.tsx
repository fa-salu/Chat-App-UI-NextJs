"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { axiosInstance } from "@/utils/axios";


export default function Signin() {
  const route = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async () => {
    try {
    
      const response = await axiosInstance.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      const data = response.data;

    
      if (response.status === 200) {
      
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("token", data.token);

        alert("Login successful");
        route.push("/chat");
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
    
      if (error.response) {
      
        setErrorMessage(error.response.data.message || "An error occurred");
      } else if (error.request) {
      
        setErrorMessage("No response from the server");
      } else {
      
        setErrorMessage("Request error occurred");
      }
      console.error("Error during login:", error);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="w-full max-w-sm p-10 border rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-8 text-center">Login</h2>
        {errorMessage && (
          <div className="mb-4 text-red-500 text-center">{errorMessage}</div>
        )}
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
          onClick={handleLogin}
        >
          Login
        </button>
      </div>
    </div>
  );
}
