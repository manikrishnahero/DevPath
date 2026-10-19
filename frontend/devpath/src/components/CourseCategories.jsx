import React from "react";
import "../css/CourseCategories.css";

import {
  Code2,
  Palette,
  Briefcase,
  BarChart3,
  Megaphone,
  Users,
  ArrowRight,
  ArrowUpRight,
  Flame,
  Sparkles,
} from "lucide-react";

import { Link } from "react-router-dom";

const categories = [
  {
    id: 1,
    title: "Programming",
    description: "Learn to code and build real-world projects from scratch.",
    courses: 120,
    topics: ["React", "Python", "Node.js"],
    icon: Code2,
    themeClass: "category-blue",
    tag: { label: "Most popular", icon: Flame },
  },
  {
    id: 2,
    title: "Design",
    description: "Master UI/UX, graphic design and creative tooling.",
    courses: 85,
    topics: ["Figma", "UI/UX", "Branding"],
    icon: Palette,
    themeClass: "category-pink",
  },
  {
    id: 3,
    title: "Business",
    description: "Grow your business and sharpen your leadership skills.",
    courses: 60,
    topics: ["Startups", "Finance", "Strategy"],
    icon: Briefcase,
    themeClass: "category-green",
  },
  {
    id: 4,
    title: "Data Science",
    description: "Analyze data, build models and create insights.",
    courses: 45,
    topics: ["ML", "SQL", "Analytics"],
    icon: BarChart3,
    themeClass: "category-purple",
    tag: { label: "Trending", icon: Sparkles },
  },
  {
    id: 5,
    title: "Marketing",
    description: "Digital marketing, SEO and brand strategy that converts.",
    courses: 70,
    topics: ["SEO", "Ads", "Content"],
    icon: Megaphone,
    themeClass: "category-orange",
  },
  {
    id: 6,
    title: "Soft Skills",
    description: "Communication, productivity and career growth.",
    courses: 40,
    topics: ["Speaking", "Focus", "Careers"],
    icon: Users,
    themeClass: "category-teal",
  },
];

// Moves the spotlight glow to follow the cursor inside a card
function handleMouseMove(e) {
  const rect = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--mx", `${e.clientX - rect.left}px`);
  e.currentTarget.style.setProperty("--my", `${e.clientY - rect.top}px`);
}

export default function CourseCategories() {
  return (
    <section className="categories-section" id="categories">
      <div className="categories-bg" aria-hidden="true" />

      {/* Header */}
      <div className="categories-header">
        <div className="header-left">
          <span className="categories-badge">
            <span className="badge-dot" />
            EXPLORE CATEGORIES
          </span>

          <h2>
            Popular Course <span>Categories</span>
          </h2>

          <p>
            Choose from a wide range of courses designed to help you learn new
            skills and advance your career.
          </p>
        </div>

        {/* <div className="header-right">
          <Link to="/courses" className="view-all-btn">
            <span>View All Courses</span>
            <ArrowRight size={18} />
          </Link>
        </div> */}
      </div>

      {/* Categories */}
      <div className="categories-grid">
        {categories.map((category, index) => {
          const Icon = category.icon;
          const Tag = category.tag?.icon;

          return (
            <Link
              to="/courses"
              className={`category-card ${category.themeClass}`}
              key={category.id}
              style={{ "--i": index }}
              onMouseMove={handleMouseMove}
              aria-label={`${category.title} – ${category.courses}+ courses`}
            >
              <div className="category-top">
                <div className="icon-wrapper">
                  <Icon size={26} strokeWidth={1.9} />
                </div>

                {category.tag ? (
                  <span className="card-tag">
                    <Tag size={12} />
                    {category.tag.label}
                  </span>
                ) : (
                  <span className="card-arrow">
                    <ArrowUpRight size={18} />
                  </span>
                )}
              </div>

              <div className="card-content">
                <h3>{category.title}</h3>
                <p>{category.description}</p>

                <ul className="topic-list">
                  {category.topics.map((topic) => (
                    <li key={topic}>{topic}</li>
                  ))}
                </ul>
              </div>

              <div className="card-footer">
                <span className="course-count">
                  <strong>{category.courses}+</strong> courses
                </span>

                <span className="explore-link">
                  Explore
                  <ArrowRight size={15} />
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
