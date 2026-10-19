import React from "react";
import "../css/OurImpact.css";
import { Users, BookOpen, Star, Award } from "lucide-react";

export default function OurImpact() {
  const stats = [
    {
      id: 1,
      value: "50,000+",
      label: "Active Learners",
      icon: Users,
    },
    {
      id: 2,
      value: "1,200+",
      label: "Expert Led Courses",
      icon: BookOpen,
    },
    {
      id: 3,
      value: "4.8/5",
      label: "Average Rating",
      icon: Star,
    },
    {
      id: 4,
      value: "10,000+",
      label: "Certificates Issued",
      icon: Award,
    },
  ];

  return (
    <section className="impact-section">
      <div className="impact-container">
        {/* Left Side Header */}
        <div className="impact-header">
          <span className="impact-badge">Our Impact</span>
          <h2>Learning by the Numbers</h2>
          <p>
            Join thousands of learners who are already growing with LearnHub.
          </p>
        </div>

        {/* Right Side Stats Grid / List with Vertical Dividers */}
        <div className="stats-wrapper">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <React.Fragment key={stat.id}>
                {index > 0 && <div className="stat-divider" aria-hidden="true" />}
                <div className="stat-item">
                  <div className="stat-icon-wrapper">
                    <Icon size={28} strokeWidth={1.75} />
                  </div>
                  <span className="stat-value">{stat.value}</span>
                  <span className="stat-label">{stat.label}</span>
                </div>
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </section>
  );
}