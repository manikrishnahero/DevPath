import React from "react";
import { Link } from "react-router-dom";
import { CodeXml, Send, Heart } from "lucide-react";
import {
  IoLogoGithub,
  IoLogoTwitter,
  IoLogoLinkedin,
  IoLogoDiscord,
  IoMailOutline,
  IoCallOutline,
  IoLocationOutline,
  IoArrowUpOutline,
} from "react-icons/io5";
import "../css/Footer.css";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="site-footer">
      {/* Top Newsletter / CTA Band */}
      {/* <div className="footer-newsletter-banner">
        <div className="newsletter-container">
          <div className="newsletter-text">
            <h3>Stay ahead in tech</h3>
            <p>Get weekly coding tutorials, course updates, and career tips directly in your inbox.</p>
          </div>
          <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
            <div className="input-group">
              <input type="email" placeholder="Enter your email address" required />
              <button type="submit" aria-label="Subscribe to newsletter">
                <span>Subscribe</span>
                <Send size={16} />
              </button>
            </div>
          </form>
        </div>
      </div> */}

      {/* Main Footer Grid */}
      <div className="footer-main">
        <div className="footer-container">
          {/* Brand Info */}
          <div className="footer-col brand-col">
            <Link to="/" className="brand" aria-label="DevPath home">
              <span className="brand-badge">
                <CodeXml className="brand-icon" size={22} />
              </span>
              <span className="brand-name">DevPath</span>
            </Link>

            <p className="brand-desc">
              Empowering the next generation of developers with hands-on learning paths, real-world projects, and industry-recognized certifications.
            </p>

            <div className="social-links">
              <a href="https://github.com" target="_blank" rel="noreferrer" aria-label="GitHub">
                <IoLogoGithub />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="Twitter">
                <IoLogoTwitter />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn">
                <IoLogoLinkedin />
              </a>
              <a href="https://discord.com" target="_blank" rel="noreferrer" aria-label="Discord">
                <IoLogoDiscord />
              </a>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="footer-col">
            <h4 className="footer-heading">Navigation</h4>
            <ul className="footer-links">
              <li><a href="#hero">Home</a></li>
              <li><a href="#impact">Our Impact</a></li>
              <li><a href="#courses">Courses</a></li>
              <li><a href="#languages">Languages</a></li>
              <li><a href="#how-it-works">How It Works</a></li>
              <li><a href="#faq">FAQ</a></li>
            </ul>
          </div>

          {/* Learning Tracks */}
          <div className="footer-col">
            <h4 className="footer-heading">Learning Tracks</h4>
            <ul className="footer-links">
              <li><Link to="/courses?lang=javascript">JavaScript & Node.js</Link></li>
              <li><Link to="/courses?lang=python">Python & AI</Link></li>
              <li><Link to="/courses?lang=typescript">TypeScript & React</Link></li>
              <li><Link to="/courses?lang=cpp">C++ Systems</Link></li>
              <li><Link to="/courses?lang=rust">Rust Engineering</Link></li>
              <li><Link to="/courses?lang=java">Java & Spring Boot</Link></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="footer-col contact-col">
            <h4 className="footer-heading">Contact Us</h4>
            <ul className="contact-list">
              <li>
                <IoMailOutline className="contact-icon" />
                <span>support@devpath.io</span>
              </li>
              <li>
                <IoCallOutline className="contact-icon" />
                <span>+1 (800) 555-0199</span>
              </li>
              <li>
                <IoLocationOutline className="contact-icon" />
                <span>San Francisco, CA & Remote</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <div className="bottom-container">
          <p className="copyright">
            © {new Date().getFullYear()} DevPath Inc. Crafted with <Heart size={14} className="heart-icon" /> for learners worldwide.
          </p>

          <div className="bottom-links">
            <Link to="/privacy">Privacy Policy</Link>
            <span className="dot">•</span>
            <Link to="/terms">Terms of Service</Link>
            <span className="dot">•</span>
            <button onClick={scrollToTop} className="back-to-top" aria-label="Back to top">
              <span>Top</span>
              <IoArrowUpOutline />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}