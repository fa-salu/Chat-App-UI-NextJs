"use client";

import React, { useState } from "react";
import ChatList from "./chatList";
import ChatBox from "./cahtBox";
import ChatDetails from "./chatDetails";

type State = {
  id: string;
  name: string;
};

export default function ChatApp() {
  const [state, setState] = useState<State>({
    id: "",
    name: ""
  });
  
  return (
    <div className="flex w-full h-screen">
      <ChatList setState={setState} />
      <ChatBox state={state} />
      <ChatDetails />
    </div>
  );
}
