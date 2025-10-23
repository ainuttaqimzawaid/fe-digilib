import { FaSquareInstagram, FaXTwitter } from "react-icons/fa6";
import Logo from "../assets/images/Letter C Logo With Education and Book Concept._20250408_193234_0000.png";
import { FaFacebook, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <section className="bg-[#462d07] text-white py-8 text-sm md:text-base">
      <div className="container flex justify-around mx-auto gap-8">
        <div className="flex flex-col items-center">
          <img src={Logo} alt="Cendria_Logo" className="w-6 md:w-12 h-6 md:h-12" />
          <p className="max-w-36 pl-6 md:pl-0">Cendria Digital Library</p>
        </div>
        <ul>
          <li>About Us</li>
          <li> Books</li>
          <li> Books Club</li>
          <li>My Library</li>
        </ul>
        <ul>
          <li>Terms and Condition</li>
          <li>Question and Answer</li>
          <li>
            <div>Connect:</div>
            <div className="flex gap-2">
              <a href="https://www.instagram.com/cendria.id/" target="_blank" rel="noopener noreferrer">
                <FaSquareInstagram />
              </a>
              <a href="https://www.instagram.com/cendria.id/" target="_blank" rel="noopener noreferrer">
                <FaFacebook />
              </a>
              <a href="https://www.instagram.com/cendria.id/" target="_blank" rel="noopener noreferrer">
                <FaXTwitter />
              </a>
              <a href="https://www.instagram.com/cendria.id/" target="_blank" rel="noopener noreferrer">
                <FaLinkedin />
              </a>
            </div>
          </li>
        </ul>
      </div>
      <div className="container mx-auto text-center mt-4">
        <p>© 2025 Ainuttaqim Zawait. All rights reserved.</p>
      </div>
    </section>
  );
};

export default Footer;
