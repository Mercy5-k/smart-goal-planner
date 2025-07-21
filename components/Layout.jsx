import React from "react";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-900">
    
        <main className="flex-grow p-6">
          {children}
        </main>
      </div>
  );
}
