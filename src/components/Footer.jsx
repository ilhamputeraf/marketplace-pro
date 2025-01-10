import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-pink-400 text-pink-900 py-4 mt-10">
      <div className="container mx-auto text-center px-4">
        <p>&copy; {new Date().getFullYear()} Keeva Company. All rights reserved.</p>
        <div className="mt-2">
          <a href="/about" className="mx-2 hover:text-pink-400">About</a>
          <a href="/privacy-policy" className="mx-2 hover:text-pink-400">Privacy Policy</a>
          <a href="/terms" className="mx-2 hover:text-pink-400">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
