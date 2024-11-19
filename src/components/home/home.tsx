"use client";

import Link from "next/link";

export default function Main() {
  return (
    <div className="bg-gradient-to-b from-blue-600 to-blue-800 text-white min-h-screen">
      <section className="flex flex-col lg:flex-row items-center justify-between px-8 py-20 max-w-7xl mx-auto">
        <div className="flex-1 mb-10 lg:mb-0">
          <h1 className="text-5xl font-bold mb-6">
            Welcome to <span className="text-yellow-400">ChatApp</span>
          </h1>
          <p className="text-lg mb-8">
            Connect with your friends and family using our real-time chat
            application. Experience seamless messaging, group chats, and more!
          </p>
          <div className="flex gap-4">
            <Link
              href="/signup"
              className="bg-yellow-400 text-blue-800 px-6 py-3 rounded-lg font-semibold hover:bg-yellow-300 transition"
            >
              Get Started
            </Link>
            <Link
              href="/signin"
              className="bg-transparent border-2 border-yellow-400 text-yellow-400 px-6 py-3 rounded-lg font-semibold hover:bg-yellow-400 hover:text-blue-800 transition"
            >
              Log In
            </Link>
          </div>
        </div>

        <div className="flex-1">
          <img
            src="/chat-illustration.png"
            alt="Chat Illustration"
            className="w-full max-w-md mx-auto"
          />
        </div>
      </section>

      <section className="bg-white text-gray-800 py-20">
        <div className="max-w-6xl mx-auto px-8">
          <h2 className="text-4xl font-bold text-center mb-10">
            Why Choose ChatApp?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-blue-50 p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold mb-4">
                Real-Time Messaging
              </h3>
              <p>
                Experience lightning-fast messaging with instant notifications.
              </p>
            </div>

            <div className="bg-blue-50 p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold mb-4">Group Chats</h3>
              <p>
                Stay connected with your groups and enjoy seamless
                conversations.
              </p>
            </div>

            <div className="bg-blue-50 p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold mb-4">Secure & Private</h3>
              <p>Your data is safe with end-to-end encryption for all chats.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-b from-blue-800 to-blue-900 py-20 text-center">
        <h2 className="text-4xl font-bold mb-6">Ready to Start Chatting?</h2>
        <p className="text-lg mb-8">
          Join now and connect with your friends and family instantly!
        </p>
        <Link
          href="/signup"
          className="bg-yellow-400 text-blue-800 px-8 py-4 rounded-lg font-semibold hover:bg-yellow-300 transition"
        >
          Create an Account
        </Link>
      </section>
    </div>
  );
}
