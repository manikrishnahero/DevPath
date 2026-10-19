import React from "react";
import "../css/Home.css";
import {
  BookOpenText,
  MoveRight,
  Play,
  GraduationCap,
  UserRound,
  BadgeCheck,
} from "lucide-react";
import { Link } from "react-router";

export default function Home() {
  const benefits = [
    {
      icon: GraduationCap,
      title: "Flexible Learning",
      description: "Learn at your own pace",
    },
    {
      icon: UserRound,
      title: "Expert Instructors",
      description: "Learn from industry pros",
    },
    {
      icon: BadgeCheck,
      title: "Certified Courses",
      description: "Get recognized globally",
    },
  ];

  return (
    <div className="home-container">
      <header className="heading-content">
        {/* Top Badge */}
        <aside className="top-headingbox">
          <div className="icon">
            <BookOpenText size={18} />
          </div>
          <div className="top-heading">
            <span>Modern Learning Management System</span>
          </div>
        </aside>

        {/* Main Heading */}
        <section className="main-heading">
          <h1>
            Learn New Skills Anytime, <span className="highlight-text">Anywhere</span>
          </h1>
          <h1>
            <span className="accent-gradient">Upgrade Yourself</span>
          </h1>
        </section>

        {/* Sub Heading */}
        <section className="sub-heading">
          <p>
            Access high-quality courses, track your progress, and build your
            future with our easy-to-use LMS platform.
          </p>
        </section>

        {/* CTA Buttons */}
        <div className="button-section">
          <Link to="/login" className="mainbtn primary-btn">
            <span>Explore Courses</span>
            <MoveRight size={20} className="btn-icon" />
          </Link>
          
          <Link to="/register" className="mainbtn secondary-btn">
            <Play size={18} className="btn-icon play-icon" />
            <span>Watch Video</span>
          </Link>
        </div>

        {/* Benefits Section */}
        <section className="benefits">
          <div className="benefits-container">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div className="benefit-item" key={benefit.title}>
                  <div className="benefit-icon">
                    <Icon size={22} strokeWidth={2} />
                  </div>
                  <div className="benefit-content">
                    <h3>{benefit.title}</h3>
                    <p>{benefit.description}</p>
                  </div>
                  {index < benefits.length - 1 && (
                    <span className="benefit-divider"></span>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      </header>
    </div>
  );
}