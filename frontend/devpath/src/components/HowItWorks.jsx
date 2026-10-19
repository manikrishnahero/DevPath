import React from "react";
import "../css/HowItWorks.css";
import { User, BookOpen, Play, Award, ArrowRight } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      number: 1,
      title: "Create Account",
      description: "Sign up for free and set up your profile.",
      icon: User,
    },
    {
      number: 2,
      title: "Choose a Course",
      description: "Explore our catalog and pick what interests you.",
      icon: BookOpen,
    },
    {
      number: 3,
      title: "Start Learning",
      description: "Watch videos, complete assignments and practice.",
      icon: Play,
    },
    {
      number: 4,
      title: "Get Certified",
      description: "Earn a completion certificate and showcase your skills.",
      icon: Award,
    },
  ];

  return (
    <section className="how-it-works-section">
      <div className="how-it-works-container">
        {/* Left Side Header */}
        <div className="how-it-works-header">
          <span className="steps-badge">Simple Steps</span>
          <h2>How It Works</h2>
          <p>
            Get started in just a few simple steps and begin your learning
            journey today.
          </p>
        </div>

        {/* Right Side Step Process */}
        <div className="steps-wrapper">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <React.Fragment key={step.number}>
                <div className="step-card">
                  <div className="icon-badge-container">
                    <span className="step-number">{step.number}</span>
                    <div className="icon-circle">
                      <Icon size={26} strokeWidth={2} />
                    </div>
                  </div>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>

                {index < steps.length - 1 && (
                  <div className="step-arrow">
                    <ArrowRight size={20} />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </section>
  );
}