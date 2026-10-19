
import { useEffect, useState } from "react";
import "../css/LearningVideos.css";

const API_BASE_URL = "http://127.0.0.1:8000";

export default function VideoPlayer({ item, onClose }) {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!item) return;

    const controller = new AbortController();

    const query =
      item.kind === "course"
        ? `course=${encodeURIComponent(item.id)}`
        : `programming_language=${encodeURIComponent(item.id)}`;

    async function loadVideos() {
      setLoading(true);
      setError("");
      setVideos([]);

      try {
        const response = await fetch(
          `${API_BASE_URL}/videos/?${query}`,
          { signal: controller.signal }
        );

        if (!response.ok) {
          throw new Error("Unable to load videos.");
        }

        const data = await response.json();

        setVideos(
          Array.isArray(data) ? data : data.results ?? []
        );
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message || "Something went wrong.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadVideos();

    return () => controller.abort();
  }, [item?.id, item?.kind]);

  useEffect(() => {
    if (!item) return;

    function handleKeyDown(event) {
      if (event.key === "Escape") onClose();
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [item, onClose]);

  if (!item) return null;

  function getVideoUrl(video) {
    if (!video.video_file) return "";

    return video.video_file.startsWith("http")
      ? video.video_file
      : `${API_BASE_URL}${video.video_file}`;
  }

  return (
    <div
      className="video-dialog-backdrop"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        className="video-dialog"
        role="dialog"
        aria-modal="true"
        aria-label={`${item.title} videos`}
      >
        <header className="video-dialog-header">
          <div>
            <span className="video-eyebrow">LEARNING LIBRARY</span>
            <h2>{item.title}</h2>
            <p>Watch lessons at your own pace.</p>
          </div>

          <button
            className="video-dialog-close"
            onClick={onClose}
            aria-label="Close videos"
            type="button"
          >
            &times;
          </button>
        </header>

        <div className="video-dialog-content">
          {loading && (
            <p className="video-status" role="status">
              Loading your lessons...
            </p>
          )}

          {error && (
            <p className="video-error" role="alert">
              {error}
            </p>
          )}

          {!loading && !error && videos.length === 0 && (
            <div className="video-empty">
              <span className="video-empty-icon">▶</span>
              <h3>No lessons available yet</h3>
              <p>New video lessons will appear here.</p>
            </div>
          )}

          {!loading && !error && videos.length > 0 && (
            <div className="video-list">
              {videos.map((video, index) => (
                <article className="video-item" key={video.id}>
                  <div className="video-item-heading">
                    <span className="video-number">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <div>
                      <h3>{video.title}</h3>

                      {video.description && (
                        <p>{video.description}</p>
                      )}
                    </div>
                  </div>

                  {video.video_file ? (
                    <video
                      className="video-player"
                      controls
                      preload="metadata"
                      playsInline
                      src={getVideoUrl(video)}
                    >
                      Your browser does not support video playback.
                    </video>
                  ) : (
                    <p className="video-error">
                      Video file is unavailable.
                    </p>
                  )}
                </article>
              ))}
            </div>
          )}
        </div>

        <footer className="video-dialog-footer">
          <span>{videos.length} lesson(s)</span>
          <button
            className="video-done-button"
            onClick={onClose}
            type="button"
          >
            Close lessons
          </button>
        </footer>
      </section>
    </div>
  );
}
