import { useEffect, useState, useCallback } from "react";
import LearningVideos from "../components/LearningVideos";
import "../css/Languages.css";
import { API_URL } from "../config";


export default function ProgrammingLanguages() {
  const [languages, setLanguages] = useState([]);
  const [search, setSearch] = useState("");
  const [difficulty, setDifficulty] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const closeVideos = useCallback(() => setSelectedItem(null), []);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchLanguages() {
      try {
        const response = await fetch(`${API_URL}`, { signal: controller.signal });
        if (!response.ok) {
          throw new Error("Failed to load programming languages.");
        }

        const data = await response.json();
        setLanguages(Array.isArray(data) ? data : (data.results ?? []));
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message || "Something went wrong.");
        }
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }

    fetchLanguages();
    return () => controller.abort();
  }, []);

  const searchText = search.trim().toLowerCase();
  const filteredLanguages = languages.filter((language) => {
    const name = (language.name || "").toLowerCase();
    const description = (language.description || "").toLowerCase();
    const matchesSearch =
      name.includes(searchText) || description.includes(searchText);
    const matchesDifficulty =
      difficulty === "All" || language.difficulty === difficulty;

    return matchesSearch && matchesDifficulty;
  });

  if (loading) {
    return (
      <p className="language-message" role="status">
        Loading programming languages...
      </p>
    );
  }

  if (error) {
    return (
      <p className="language-error" role="alert">
        {error}
      </p>
    );
  }

  return (
    <section className="languages-section" aria-labelledby="languages-title">
      <div className="languages-container">
        <header className="languages-header">
          <h1 id="languages-title">Explore Programming Languages</h1>
          <p>
            Choose your language and start building your development skills.
          </p>
        </header>

        <div className="language-controls">
          <input
            type="search"
            className="language-search"
            placeholder="Search programming languages..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            aria-label="Search programming languages"
          />
          <select
            className="language-filter"
            value={difficulty}
            onChange={(event) => setDifficulty(event.target.value)}
            aria-label="Filter by difficulty"
          >
            <option value="All">All Levels</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>

        {filteredLanguages.length > 0 ? (
          <div className="languages-grid">
            {filteredLanguages.map((language) => (
              <article
                className="language-card"
                key={language.id ?? language.name}
              >
                <div className="language-card-top">
                  {language.logo || language.logo_url ? (
                    <img
                      className="language-logo"
                      src={language.logo || language.logo_url}
                      alt={`${language.name || "Programming language"} logo`}
                      loading="lazy"
                    />
                  ) : (
                    <div
                      className="language-logo-placeholder"
                      aria-hidden="true"
                    >
                      {(language.name || "?").charAt(0)}
                    </div>
                  )}
                  <span className="language-level">
                    {language.difficulty || "Beginner"}
                  </span>
                </div>

                <h2>{language.name}</h2>
                <p className="language-description">{language.description}</p>

                <div className="language-card-footer">
                  <span>Programming Language</span>
                  <button
                    className="enroll-btn"
                    type="button"
                    onClick={() =>
                      setSelectedItem({
                        kind: "language",
                        id: language.id,
                        title: language.name,
                      })
                    }
                  >
                    Learn
                  </button>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <p className="language-message" role="status">
            No programming languages found.
          </p>
        )}
      </div>
      <LearningVideos item={selectedItem} onClose={closeVideos} />
    </section>
  );
}
