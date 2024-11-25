"use client";

import { axiosInstance } from "@/utils/axios";
import React, { useEffect, useState } from "react";

type State = {
  id: string;
  name: string;
};

interface ChatListProps {
  setState: React.Dispatch<React.SetStateAction<State>>;
}

export default function ChatList({ setState }: ChatListProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [users, setUsers] = useState<any[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [loggedInUser, setLoggedInUser] = useState<any>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
       
        const response = await axiosInstance.get("http://localhost:5000/api/auth/users");
        setUsers(response.data.users);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();

   
    const storedUser = JSON.parse(localStorage.getItem("user") || "null");
    if (storedUser) {
      setLoggedInUser(storedUser);
    }
  }, []);

  return (
    <div className="w-1/4 h-full p-4 bg-gray-100">
      <div className="flex items-center mb-4">
        <img
          src={loggedInUser?.profilePic || "https://picsum.photos/300"}
          className="w-10 h-10 rounded-full"
          alt="Logged In User"
        />
        <div className="ml-2">
          <h2 className="font-bold">{loggedInUser?.username || "Alixa"}</h2>
          <p className="text-sm text-gray-500">
            {loggedInUser?.role || "Senior Developer"}
          </p>
        </div>
      </div>
      <input
        type="text"
        placeholder="Search Here..."
        className="w-full p-2 mb-4 rounded-lg border border-gray-300"
      />
      <div className="space-y-4 cursor-pointer">
        {users?.map((user) => (
          <div
            key={user._id}
            className="flex items-center justify-between p-2 hover:bg-gray-200 rounded-lg"
            onClick={() => setState({ id: user._id, name: user.username })}
          >
            <div className="flex items-center">
              <img
                src={user.profilePic || "https://picsum.photos/200/300"}
                className="w-10 h-10 rounded-full"
                alt="User Icon"
              />
              <div className="ml-2">
                <h3 className="font-bold">{user.username}</h3>
                <p className="text-sm text-gray-500">
                  {user.role || "Developer"}
                </p>
              </div>
            </div>
            <span className="text-xs text-gray-500">10:35 AM</span>
          </div>
        ))}
      </div>
    </div>
  );
}
