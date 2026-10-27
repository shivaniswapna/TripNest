
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  async function handleSignup(e) {
    e.preventDefault();
    setMessage("Creating account...");

    try {
      const response = await fetch(
        "http://localhost:8081/api/auth/signup",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || data.error || "Signup failed");
      }

      if (data.token) {
        localStorage.setItem("token", data.token);
      }

      localStorage.setItem("userName", name);
      localStorage.setItem("userEmail", email);

      navigate("/login");
    } catch (error) {
      setMessage(error.message || "Cannot connect to server");
    }
  }

  return (
    <div style={styles.page}>
      <form onSubmit={handleSignup} style={styles.card}>
        <h1>Create Account ✈️</h1>
        <p>Join us and plan your next journey!</p>

        <input
          style={styles.input}
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

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
          placeholder="Password (minimum 8 characters)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          minLength={8}
          required
        />

        <button style={styles.button} type="submit">
          Sign Up
        </button>

        {message && <p>{message}</p>}

        <p>
          Already have an account? <Link to="/login">Login</Link>
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
