import React from "react";

const Footer = () => {
  return (
    <footer className="text-center py-4 mt-10 text-gray-300 border-t border-gray-700">
      <p>&copy; {new Date().getFullYear()} ThinkBoard | All rights reserved.</p>
    </footer>
  );
};

export default Footer;
