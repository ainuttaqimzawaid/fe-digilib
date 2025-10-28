import { FaSquareInstagram, FaXTwitter } from "react-icons/fa6";
import Logo from "../assets/images/Letter C Logo With Education and Book Concept._20250408_193234_0000.png";
import { FaFacebook, FaLinkedin } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  return (
    <section className="bg-[#462d07] text-white py-8 text-sm md:text-base">
      <div className="container flex justify-around mx-auto gap-8">
        <div className="flex flex-col items-center">
          <img src={Logo} alt="Cendria_Logo" className="w-6 md:w-12 h-6 md:h-12" />
          <p className="max-w-36 pl-6 md:pl-0">Cendria Digital Library</p>
        </div>
        <ul className="flex flex-col gap-2">
          <li>
            <button
              className="!p-0 hover:underline text-left"
              onClick={() => navigate("/about-us")}
            >
              About Us
            </button>
          </li>
          <li>
            <button
              className="!p-0 hover:underline text-left"
              onClick={() => navigate("/books")}
            >
              Books
            </button>
          </li>
          <li>
            <button
              className="!p-0 hover:underline text-left"
              onClick={() => navigate("/book-club")}
            >
              Books Club
            </button>
          </li>
          <li>
            <button
              className="!p-0 hover:underline text-left"
              onClick={() => navigate("/my-library")}
            >
              My Library
            </button>
          </li>
        </ul>

        <ul className="flex flex-col gap-2">
          <li>
            <button
              className="!p-0 hover:underline text-left"
              onClick={() => navigate("/terms-and-condition")}
            >
              Terms and Condition
            </button>
          </li>
          <li>
            <button
              className="!p-0 hover:underline text-left"
              onClick={() => navigate("/faq")}
            >
              Question and Answer
            </button>
          </li>
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
