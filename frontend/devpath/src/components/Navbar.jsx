import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CodeXml } from "lucide-react";
import {
  IoMenu, IoClose, IoHomeOutline, IoStatsChartOutline,
  IoBookOutline, IoCodeSlashOutline, IoListOutline,
  IoHelpCircleOutline, IoLogInOutline, IoPersonAddOutline,
} from "react-icons/io5";
import "../css/Navbar.css";

const NAV_ITEMS = [
  { id: "hero",         label: "Home",         icon: IoHomeOutline },
  { id: "impact",       label: "Our Impact",   icon: IoStatsChartOutline },
  { id: "courses",      label: "Courses",      icon: IoBookOutline },
  { id: "languages",    label: "Languages",    icon: IoCodeSlashOutline },
  { id: "how-it-works", label: "How It Works", icon: IoListOutline },
  { id: "faq",          label: "FAQ",          icon: IoHelpCircleOutline },
];

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState("hero");

  const closeMenu = () => setIsOpen(false);

  // Add shadow / stronger background once the page is scrolled
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight the link of the section currently in view
  useEffect(() => {
    const sections = NAV_ITEMS.map((item) =>
      document.getElementById(item.id)
    ).filter(Boolean);
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  // Escape closes menu, resizing to desktop resets it, body scroll lock
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setIsOpen(false);
    const onResize = () => window.innerWidth > 850 && setIsOpen(false);
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <header className={`navbar ${scrolled ? "is-scrolled" : ""}`}>
      <nav className="navbar-inner" aria-label="Main navigation">
        {/* Logo */}
        <Link to="/" className="brand" onClick={closeMenu} aria-label="DevPath home">
          <span className="brand-badge">
            <CodeXml className="brand-icon" size={22} />
          </span>
          <span className="brand-name">DevPath</span>
        </Link>

        {/* Mobile Menu Button */}
        <button
          type="button"
          className={`nav-toggle ${isOpen ? "is-open" : ""}`}
          onClick={() => setIsOpen((open) => !open)}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          aria-controls="nav-menu"
        >
          {isOpen ? <IoClose className="menubar" /> : <IoMenu className="menubar" />}
        </button>

        {/* Navigation Links */}
        <div id="nav-menu" className={`nav-menu ${isOpen ? "is-open" : ""}`}>
          <ul className="nav-links">
            {NAV_ITEMS.map(({ id, label, icon: Icon }) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  onClick={closeMenu}
                  className={activeId === id ? "is-active" : ""}
                  aria-current={activeId === id ? "true" : undefined}
                >
                  <Icon />
                  <span>{label}</span>
                </a>
              </li>
            ))}
          </ul>

          {/* Auth Buttons */}
          <div className="nav-auth">
            <Link to="/login" className="btn btn-outline" onClick={closeMenu}>
              <IoLogInOutline />
              <span>Login</span>
            </Link>
            <Link to="/register" className="btn btn-primary" onClick={closeMenu}>
              <IoPersonAddOutline />
              <span>Register</span>
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;