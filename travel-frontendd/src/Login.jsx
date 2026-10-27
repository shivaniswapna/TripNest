
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    setMessage("Logging in...");

    try {
      const response = await fetch(
        "http://localhost:8081/api/auth/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || data.error || "Invalid email or password");
      }

      if (data.token) {
        localStorage.setItem("token", data.token);
      } else {
        throw new Error("Login succeeded, but no token was returned.");
      }

      localStorage.setItem("userEmail", email);

      setMessage("Login successful!");
      navigate("/bookings");
    } catch (error) {
      setMessage(error.message || "Cannot connect to server");
    }
  }

  return (
    <div style={styles.page}>
      <form onSubmit={handleLogin} style={styles.card}>
        <h1>Welcome Back ✈️</h1>
        <p>Login to your travel account</p>

        <input
          style={styles.input}
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          style={styles.input}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button style={styles.button} type="submit">
          Login
        </button>

        {message && <p>{message}</p>}

        <p>
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </form>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "80vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f1f5f9",
    padding: "20px",
  },
  card: {
    width: "350px",
    maxWidth: "100%",
    padding: "30px",
    borderRadius: "15px",
    background: "white",
    boxShadow: "0 4px 20px #00000015",
    textAlign: "center",
  },
  input: {
    width: "100%",
    boxSizing: "border-box",
    padding: "12px",
    margin: "10px 0",
    border: "1px solid #ccc",
    borderRadius: "7px",
  },
  button: {
    width: "100%",
    padding: "12px",
    marginTop: "10px",
    border: "none",
    borderRadius: "7px",
    background: "#2563eb",
    color: "white",
    cursor: "pointer",
  },
};
