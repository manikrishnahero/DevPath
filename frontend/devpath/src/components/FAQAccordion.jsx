import React, { useState } from "react";
import "../css/FAQAccordion.css";
import { ChevronDown, Sparkles, HelpCircle } from "lucide-react";

export default function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState(0); // First item open by default

  const faqItems = [
    {
      id: 1,
      category: "Learning & Courses",
      question: "How do the self-paced courses work on LearnHub?",
      answer:
        "All our courses are structured into bite-sized video lessons, hands-on coding exercises, and real-world projects. Once enrolled, you get lifetime access to the content so you can learn at your own pace whenever it suits your schedule.",
    },
    {
      id: 2,
      category: "Certificates & Career",
      question: "Will I receive a verified certificate upon completion?",
      answer:
        "Yes! Upon completing 100% of the course material and passing the final assessment project, you will be issued an official, verifiable LearnHub digital certificate that you can share on LinkedIn or attach to your resume.",
    },
    {
      id: 3,
      category: "Programming Tracks",
      question: "Which programming language should I start with as a beginner?",
      answer:
        "If you are new to programming, we recommend starting with Python for Data Science/AI or JavaScript/TypeScript for Web Development. Both have gentle learning curves, massive community support, and high job demand.",
    },
    {
      id: 4,
      category: "Impact & Mentorship",
      question: "Is there mentor support if I get stuck on an exercise?",
      answer:
        "Absolutely. Every course includes access to our dedicated student community forum and Q&A section where teaching assistants, course authors, and peer learners answer questions within 24 hours.",
    },
    {
      id: 5,
      category: "Account & Payments",
      question: "Can I try courses before subscribing or purchasing?",
      answer:
        "Yes, every course offers free preview modules so you can evaluate the teaching style and syllabus before making any commitment. We also offer a 14-day money-back guarantee on all full course purchases.",
    },
  ];

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="faq-section" id="faq">
      <div className="faq-container">
        {/* Header Block */}
        <div className="faq-header">
          <span className="faq-badge">
            <Sparkles size={13} />
            <span>FREQUENTLY ASKED QUESTIONS</span>
          </span>
          <h2>
            Got Questions? <span>We've Got Answers</span>
          </h2>
          <p>
            Everything you need to know about our learning path, certificates,
            and platform features.
          </p>
        </div>

        {/* Accordion Container */}
        <div className="accordion-wrapper">
          {faqItems.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={item.id}
                className={`accordion-item ${isOpen ? "is-open" : ""}`}
              >
                <button
                  className="accordion-trigger"
                  onClick={() => toggleAccordion(index)}
                  aria-expanded={isOpen}
                >
                  <div className="trigger-left">
                    <span className="question-category">{item.category}</span>
                    <h3 className="question-text">{item.question}</h3>
                  </div>
                  <div className="chevron-icon">
                    <ChevronDown size={20} />
                  </div>
                </button>

                <div
                  className="accordion-content"
                  style={{
                    maxHeight: isOpen ? "200px" : "0px",
                  }}
                >
                  <div className="content-inner">
                    <p>{item.answer}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA Box */}
        <div className="faq-footer-cta">
          <HelpCircle size={22} className="cta-icon" />
          <span>Still have questions?</span>
          <a href="#contact" className="cta-link">
            Contact Support Team
          </a>
        </div>
      </div>
    </section>
  );
}