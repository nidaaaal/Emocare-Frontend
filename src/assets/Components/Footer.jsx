import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-6">
      <div className="container mx-auto px-6 text-center">
        <p>© {new Date().getFullYear()} Emocare. All Rights Reserved.</p>
      </div>
    </footer>
  );
}
