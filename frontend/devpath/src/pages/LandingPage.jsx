import Navbar from "../components/Navbar";
import Home from "../components/Home";
import OurImpact from "../components/OurImpact";
import CourseCategories from "../components/CourseCategories";
import AllLanguages from "../components/AllLanguages";
import HowItWorks from "../components/HowItWorks";
import FAQAccordion from "../components/FAQAccordion";
import "../css/LandingPage.css";
import Footer from "../components/Footer";

function LandingPage() {
  return (
    <div className="landing">
      <Navbar />

      <section id="hero"><Home /></section>
      <section id="impact"><OurImpact /></section>
      <section id="courses"><CourseCategories /></section>
      <section id="languages"><AllLanguages /></section>
      <section id="how-it-works"><HowItWorks /></section>
      <section id="faq"><FAQAccordion /></section>
      <section ><Footer /></section>
    </div>
  );
}

export default LandingPage;