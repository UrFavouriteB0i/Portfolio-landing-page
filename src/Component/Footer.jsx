import React from "react";
import { FaGithub, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa"; // Import icons from react-icons
import { FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-t from-black via-black/80 to-transparent py-24">
      <div className="container mx-auto flex justify-center space-x-6">
        {/* GitHub */}
        <a
          href="https://github.com/UrFavouriteB0i"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-violet-800 transition duration-300"
        >
          <FaGithub size={30} />
        </a>

        {/* Instagram */}
        <a
          href="https://instagram.com/zhilaanabdrrsyd"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-violet-800 transition duration-300"
        >
          <FaInstagram size={30} />
        </a>

        {/* LinkedIn */}
        <a
          href="https://linkedin.com/in/zhilaan-rusmawan"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-violet-800 transition duration-300"
        >
          <FaLinkedin size={30} />
        </a>

        {/* Twitter */}
        <a
          href="https://x.com/Zhilaan_abdrsyd"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-violet-800 transition duration-300"
        >
          <FaXTwitter size={30} />
        </a>
      </div>
    </footer>
  );
}
