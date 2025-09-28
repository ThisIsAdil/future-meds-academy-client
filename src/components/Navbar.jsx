import { useState } from "react";
import { Link } from "react-router-dom";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Courses", path: "/courses" },
  { name: "IMAT", path: "/imat" },
  { name: "Universities", path: "/universities" },
  { name: "Study Abroad", path: "/study-abroad" },
  { name: "About Us", path: "/about" },
  { name: "Blogs", path: "/blogs" },
];

const AnimatedLink = ({ to, children, onClick }) => (
  <Link to={to} className="animated-link" onClick={onClick}>
    {children}
  </Link>
);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);

  return (
    <nav
      className="sticky top-0 z-10 w-full bg-white shadow-md"
      role="navigation"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4 text-(--accent-dark)">
        <Link to="/" className="flex items-center">
          <img
            src="/assets/logo.png"
            alt="FutureMedsAcademy Logo"
            className="h-12 w-auto"
          />
        </Link>

        <ul className="hidden lg:flex lg:items-center lg:gap-8">
          {navLinks.map(({ name, path }) => (
            <li key={name}>
              <AnimatedLink to={path}>{name}</AnimatedLink>
            </li>
          ))}
          <li>
            <a href="https://mocktest.futuremedsacademy.com/login">
              <button className="animated-button">
                <span className="label">Student Login</span>
              </button>
            </a>
          </li>
        </ul>

        <button
          onClick={toggleMenu}
          className="lg:hidden p-2 transition"
        >
          {isOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      <div
        id="mobile-menu"
        className={`lg:hidden text-(--accent-dark) transform transition-all duration-300 ease-in-out origin-top ${isOpen
          ? "max-h-screen opacity-100 translate-y-0"
          : "max-h-0 opacity-0 -translate-y-4 pointer-events-none"
          }`}
      >
        <ul className="flex flex-col items-center gap-6 bg-white px-6 py-8 shadow-md">
          {navLinks.map(({ name, path }) => (
            <li key={name}>
              <AnimatedLink to={path} onClick={closeMenu}>
                {name}
              </AnimatedLink>
            </li>
          ))}
          <li>
            <a
              href="https://mocktest.futuremedsacademy.com/login"
              onClick={closeMenu}
            >
              <button className="animated-button w-full">
                <span className="label">Student Login</span>
              </button>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
