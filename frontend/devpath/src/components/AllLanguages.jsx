import React, { useState } from "react";
import "../css/AllLanguages.css";
import {
  Code2,
  Terminal,
  Cpu,
  Boxes,
  Globe,
  Layers,
  Sparkles,
  ArrowRight,
  Search,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function AllLanguages() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const languages = [
    {
      id: 1,
      name: "JavaScript",
      category: "Web / Full-Stack",
      level: "Beginner Friendly",
      description: "Build dynamic web apps, interactive interfaces, and modern server solutions.",
      courses: "140+ Courses",
      icon: Globe,
      badgeColor: "js-badge",
    },
    {
      id: 2,
      name: "Python",
      category: "AI & Data Science",
      level: "Beginner Friendly",
      description: "Ideal for Machine Learning, Data Analytics, Automation, and Web backend.",
      courses: "180+ Courses",
      icon: Terminal,
      badgeColor: "python-badge",
    },
    {
      id: 3,
      name: "TypeScript",
      category: "Web / Enterprise",
      level: "Intermediate",
      description: "Typed JavaScript at scale. Essential for modern React, Next.js, and Node.js.",
      courses: "95+ Courses",
      icon: Code2,
      badgeColor: "ts-badge",
    },
    {
      id: 4,
      name: "C++",
      category: "Systems & Gaming",
      level: "Advanced",
      description: "High-performance systems programming, game development, and graphics rendering.",
      courses: "65+ Courses",
      icon: Cpu,
      badgeColor: "cpp-badge",
    },
    {
      id: 5,
      name: "Rust",
      category: "Systems & Security",
      level: "Advanced",
      description: "Blazing fast memory safety without a garbage collector. Systems & WebAssembly.",
      courses: "40+ Courses",
      icon: Boxes,
      badgeColor: "rust-badge",
    },
    {
      id: 6,
      name: "Java",
      category: "Enterprise & Android",
      level: "Intermediate",
      description: "Robust cross-platform applications, Spring Boot backends, and Android apps.",
      courses: "110+ Courses",
      icon: Layers,
      badgeColor: "java-badge",
    },
  ];

  const filterCategories = ["All", "Web / Full-Stack", "AI & Data Science", "Systems & Security"];

  const filteredLanguages = languages.filter((lang) => {
    const matchesFilter = activeFilter === "All" || lang.category.includes(activeFilter);
    const matchesSearch =
      lang.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lang.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <section className="languages-section" id="languages">
      <div className="languages-container">
        {/* Header Area */}
        <div className="languages-header">
          <div className="header-left">
            <span className="section-badge">
              <Sparkles size={13} />
              <span>PROGRAMMING TRACKS</span>
            </span>
            <h2>
              Explore All <span>Languages</span>
            </h2>
            <p>
              Master industry-standard languages through hands-on projects, interactive exercises, and expert instruction.
            </p>
          </div>

          {/* Search Box */}
          <div className="search-wrapper">
            <Search size={18} className="search-icon" />
            <input
              type="text"
              placeholder="Search language or skill..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Category Filters */}
        <div className="filter-bar">
          {filterCategories.map((cat) => (
            <button
              key={cat}
              className={`filter-btn ${activeFilter === cat ? "active" : ""}`}
              onClick={() => setActiveFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Languages Grid */}
        <div className="languages-grid">
          {filteredLanguages.map((lang) => {
            const Icon = lang.icon;
            return (
              <div className="lang-card" key={lang.id}>
                <div className="card-top">
                  <div className={`lang-icon-wrapper ${lang.badgeColor}`}>
                    <Icon size={24} strokeWidth={2} />
                  </div>
                  <span className="lang-level">{lang.level}</span>
                </div>

                <div className="card-body">
                  <span className="lang-category">{lang.category}</span>
                  <h3>{lang.name}</h3>
                  <p>{lang.description}</p>
                </div>

                <div className="card-footer">
                  <span className="course-count">{lang.courses}</span>
                  <Link to={`/courses?lang=${lang.name.toLowerCase()}`} className="explore-link">
                    <span>Explore</span>
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}