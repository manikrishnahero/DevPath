import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/Login.css";
import { API_URL } from "./config";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const response = await fetch(
        `${API_URL}/login/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setMessage(
          data.error ||
            data.message ||
            "Invalid username or password."
        );
        return;
      }

      // Store tokens when returned by the backend.
      if (data.access) {
        localStorage.setItem("accessToken", data.access);
      }

      if (data.refresh) {
        localStorage.setItem("refreshToken", data.refresh);
      }

      localStorage.setItem(
        "username",
        data.username || formData.username
      );

      navigate("/dashboard", { replace: true });
    } catch (error) {
      console.error("Login error:", error);
      setMessage(
        "Server connection failed. Check your Django server."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page page-auth">
      <div className="auth-panel auth-panel--intro">
        <h2 className="auth-panel__title">Welcome back</h2>
        <p className="auth-panel__text">
          Sign in to continue your application.
        </p>
      </div>

      <div className="auth-panel auth-panel--form">
        <div className="auth-card">
          <h2 className="auth-card__title">Login</h2>

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="field">
              <label htmlFor="login-username">Username</label>
              <input
                id="login-username"
                type="text"
                name="username"
                autoComplete="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>

            <div className="field">
              <label htmlFor="login-password">Password</label>
              <input
                id="login-password"
                type="password"
                name="password"
                autoComplete="current-password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-block"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          {message && (
            <p className="auth-message" role="status">
              {message}
            </p>
          )}

          <p className="auth-switch">
            Don't have an account?{" "}
            <Link to="/register">Register</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
