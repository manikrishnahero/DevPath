
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  LayoutDashboard,
  UserRound,
  BookOpen,
  LogOut,
  CodeXml,
  FolderCode,
} from "lucide-react";

import Courses from "../components/Courses";
import Profile from "../components/Profile";
import Languages from "../components/Languages";
import LearningVideos from "../components/LearningVideos"
import "../css/Dashboard.css";

function Dashboard() {
  const [activeTab, setActiveTab] = useState("Courses");
  const navigate = useNavigate();

  const tabs = [
    { name: "Courses", icon: BookOpen },
    { name: "Languages", icon: FolderCode },
  ];

  const selectedContents = {
    Dashboard: (
      <div className="dashboard-overview">
        <h2>Welcome to Devpath!</h2>
        <p>
          Continue learning, explore courses, and improve your
          programming skills.
        </p>
      </div>
    ),
    Profile: <Profile />,
    Courses: <Courses />,
    Languages: <Languages />,
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("username");

    navigate("/login", { replace: true });
  };

  return (
    <div className="dashboard">
      <aside className="sidebar">
        <h2 className="logo">
          <CodeXml size={27} />
          <span>Devpath</span>
        </h2>

        <nav className="menu" aria-label="Dashboard navigation">
          {tabs.map(({ name, icon: Icon }) => (
            <button
              key={name}
              type="button"
              className={
                activeTab === name
                  ? "menu-btn active"
                  : "menu-btn"
              }
              onClick={() => setActiveTab(name)}
              aria-current={activeTab === name ? "page" : undefined}
            >
              <Icon size={20} />
              <span>{name}</span>
            </button>
          ))}
        </nav>

        <button
          type="button"
          className="menu-btn logout-btn"
          onClick={handleLogout}
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </aside>

      <main className="content">
        <header className="dashboard-header">
          <div>
            <h1>{activeTab}</h1>
          </div>

          <div className="dashboard-user">
            <UserRound size={20} />
            <span>
              {localStorage.getItem("username") || "Student"}
            </span>
          </div>
        </header>

        <section className="content-box" key={activeTab}>
          {selectedContents[activeTab]}
        </section>
      </main>
    </div>
  );
}

export default Dashboard;
