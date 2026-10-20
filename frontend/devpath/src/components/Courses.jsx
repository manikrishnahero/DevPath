import React, { useState, useEffect, useCallback } from "react";
import LearningVideos from "../components/LearningVideos";
import "../css/Courses.css";
import { API_URL } from "../config.js";


export default function Courses() {
  const [categories, setCategories] = useState([]);
  const [courses, setCourses] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);
  const closeVideos = useCallback(() => setSelectedItem(null), []);

  // Fetch Categories on Mount
  useEffect(() => {
    fetch(`${API_URL}/categories/`)
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error("Error fetching categories:", err));
  }, []);

  // Fetch Courses whenever Category Filter changes
  useEffect(() => {
    setLoading(true);
    const endpoint =
      selectedCategory === "all"
        ? `${API_URL}/courses/`
        : `${API_URL}/courses/?category=${selectedCategory}`;

    fetch(endpoint)
      .then((res) => res.json())
      .then((data) => {
        setCourses(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching courses:", err);
        setLoading(false);
      });
  }, [selectedCategory]);

  // Format student counts (e.g., 14200 -> 14.2k)
  const formatStudents = (count) => {
    if (count >= 1000) {
      return (count / 1000).toFixed(1) + "k";
    }
    return count;
  };

  return (
    <section className="featured-courses-section">
      {/* Header & Filter Controls */}
      <div className="section-header">
        <div className="title-container">
          <h2>Explore Featured Courses</h2>
          <p>Pick from top-rated programs curated by industry veterans</p>
        </div>

        <nav className="category-filter-bar">
          <button
            className={`category-tab ${selectedCategory === "all" ? "active" : ""}`}
            onClick={() => setSelectedCategory("all")}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id || cat.slug}
              className={`category-tab ${selectedCategory === cat.slug ? "active" : ""}`}
              onClick={() => setSelectedCategory(cat.slug)}
            >
              {cat.name}
            </button>
          ))}
        </nav>
      </div>

      {/* Grid Container */}
      {loading ? (
        <div className="loading-indicator">Loading courses...</div>
      ) : (
        <div className="courses-grid">
          {courses.map((course) => (
            <article className="course-card" key={course.id}>
              <div>
                {/* Thumbnail & Badge */}
                <div className="card-thumbnail-wrapper">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="card-thumbnail"
                  />
                  {course.badge && course.badge !== "" && (
                    <span className="course-badge">{course.badge}</span>
                  )}
                </div>

                {/* Card Main Body */}
                <div className="card-body">
                  <div className="meta-stats-row">
                    {/* Rating */}
                    <div className="stat-item rating-item">
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="#fbbf24"
                      >
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                      <span>{course.rating}</span>
                      <span className="rating-count">
                        ({course.rating_count})
                      </span>
                    </div>

                    {/* Duration */}
                    <div className="stat-item">
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                      </svg>
                      <span>{course.duration_hours} Hours</span>
                    </div>

                    {/* Students */}
                    <div className="stat-item">
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                        <circle cx="9" cy="7" r="4" />
                        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                      </svg>
                      <span>{formatStudents(course.students_count)}</span>
                    </div>
                  </div>

                  <h3 className="course-title">{course.title}</h3>

                  {/* Instructor Block */}
                  {course.instructor && (
                    <div className="instructor-profile">
                      <img
                        src={course.instructor.avatar}
                        alt={course.instructor.name}
                        className="instructor-avatar"
                      />
                      <div className="instructor-info">
                        <h4>{course.instructor.name}</h4>
                        <p>{course.instructor.title}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Price & Action Button */}
              <div className="card-footer">
                <div className="price-container">
                  {/* <span className="current-price">${course.price}</span>
                  {course.original_price && (
                    <span className="original-price">
                      ${course.original_price}
                    </span>
                  )} */}
                  <span>Skilled courses</span>
                </div>
                <button
                  className="enroll-btn"
                  type="button"
                  onClick={() =>
                    setSelectedItem({
                      kind: "course",
                      id: course.id,
                      title: course.title,
                    })
                  }
                >
                  LearnCourse
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
      <LearningVideos item={selectedItem} onClose={closeVideos} />
    </section>
  );
}
