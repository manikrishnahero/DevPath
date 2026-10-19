
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/Register.css";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [loading, setLoading] = useState(false);

  const password = formData.password;

  const passwordChecks = [
    {
      label: "At least 8 characters",
      valid: password.length >= 8,
    },
    {
      label: "One uppercase letter (A-Z)",
      valid: /[A-Z]/.test(password),
    },
    {
      label: "One lowercase letter (a-z)",
      valid: /[a-z]/.test(password),
    },
    {
      label: "One number (0-9)",
      valid: /\d/.test(password),
    },
    {
      label: "One special character",
      valid: /[^A-Za-z0-9]/.test(password),
    },
  ];

  const passwordsMatch =
    formData.confirm_password.length > 0 &&
    formData.password === formData.confirm_password;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    // Clear an old message when the user edits the form
    setMessage("");
    setMessageType("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setMessageType("");

    // Check password confirmation
    if (formData.password !== formData.confirm_password) {
      setMessage("Passwords do not match.");
      setMessageType("error");
      return;
    }

    // Check password strength
    if (!passwordChecks.every((check) => check.valid)) {
      setMessage("Please meet all password requirements.");
      setMessageType("error");
      return;
    }

    setLoading(true);

    
try {
  const response = await fetch(
    "http://127.0.0.1:8000/register/",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    }
  );

  const contentType = response.headers.get("content-type");
  let data = {};

  if (contentType?.includes("application/json")) {
    data = await response.json();
  } else {
    const responseText = await response.text();
    console.error("Unexpected server response:", responseText);

    setMessage(
      `Server returned an unexpected response (HTTP ${response.status}).`
    );
    setMessageType("error");
    return;
  }

  if (!response.ok) {
    setMessage(
      data.error ||
        data.message ||
        `Request failed (HTTP ${response.status}).`
    );
    setMessageType("error");
    return;
  }

  setMessage(data.message || "Registration successful!");
  setMessageType("success");

  setFormData({
    username: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  setTimeout(() => {
    navigate("/login", { replace: true });
  }, 1000);
} catch (error) {
  console.error("Registration request failed:", error);

  setMessage(
    "Cannot reach the API. Check the Django server, API URL, and browser Console for CORS errors."
  );
  setMessageType("error");
} finally {
  setLoading(false);
}

  };

  return (
    <div className="page page-auth">
      <div className="auth-panel auth-panel--intro">
        <h2 className="auth-panel__title">
          Create your account
        </h2>

        <p className="auth-panel__text">
          Start your application in just a few minutes.
        </p>
      </div>

      <div className="auth-panel auth-panel--form">
        <div className="auth-card">
          <h2 className="auth-card__title">Register</h2>

          <form
            className="auth-form"
            onSubmit={handleSubmit}
          >
            <div className="field">
              <label htmlFor="register-username">
                Username
              </label>

              <input
                id="register-username"
                type="text"
                name="username"
                autoComplete="username"
                value={formData.username}
                onChange={handleChange}
                maxLength={150}
                required
              />
            </div>

            <div className="field">
              <label htmlFor="register-email">
                Email
              </label>

              <input
                id="register-email"
                type="email"
                name="email"
                autoComplete="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="field">
              <label htmlFor="register-password">
                Password
              </label>

              <input
                id="register-password"
                type="password"
                name="password"
                autoComplete="new-password"
                value={formData.password}
                onChange={handleChange}
                minLength={8}
                required
              />

              {formData.password.length > 0 && (
                <ul className="password-checks">
                  {passwordChecks.map((check) => (
                    <li
                      key={check.label}
                      className={
                        check.valid
                          ? "password-check valid"
                          : "password-check"
                      }
                    >
                      <span aria-hidden="true">
                        {check.valid ? "✓" : "○"}
                      </span>{" "}
                      {check.label}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="field">
              <label htmlFor="register-confirm-password">
                Confirm Password
              </label>

              <input
                id="register-confirm-password"
                type="password"
                name="confirm_password"
                autoComplete="new-password"
                value={formData.confirm_password}
                onChange={handleChange}
                required
                aria-invalid={
                  formData.confirm_password.length > 0 &&
                  !passwordsMatch
                }
              />

              {formData.confirm_password.length > 0 && (
                <small
                  className={
                    passwordsMatch
                      ? "confirm-feedback valid"
                      : "confirm-feedback"
                  }
                >
                  {passwordsMatch
                    ? "Passwords match."
                    : "Passwords do not match."}
                </small>
              )}
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-block"
              disabled={loading}
            >
              {loading ? "Registering..." : "Register"}
            </button>
          </form>

          {message && (
            <p
              className={`auth-message ${messageType}`}
              role="alert"
            >
              {message}
            </p>
          )}

          <p className="auth-switch">
            Already have an account?{" "}
            <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
