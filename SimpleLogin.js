import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SimpleLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!username.trim() || !password.trim()) {
      setMessage("Veuillez remplir tous les champs.");
      return;
    }

    setLoading(true);
    try {
      const { data } = await axios.post("http://localhost:3000/api/login", {
        username,
        password,
      });

      const { token, role, id } = data;

      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      localStorage.setItem("id", id);

      setToken(token);
      setMessage("Connexion réussie !");
      
      switch (role) {
        case "etudiant":
          navigate("/etudiant");
          break;
        case "enseignant":
          navigate("/enseignant");
          break;
        case "admin":
          navigate("/admin");
          break;
        default:
          setMessage("Rôle inconnu.");
      }
    } catch (err) {
      setMessage(err.response?.data?.message || "Erreur serveur, réessayez plus tard.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.formBox}>
        <h1 style={styles.title}>Connexion</h1>

        <div style={styles.inputGroup}>
          <label style={styles.label}>Nom d'utilisateur</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={styles.input}
            placeholder="Entrez votre nom"
            required
          />
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.label}>Mot de passe</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
            placeholder="••••••••"
            required
          />
        </div>

        <button type="submit" style={styles.button} disabled={loading}>
          {loading ? "Connexion..." : "Se connecter"}
        </button>

        {message && (
          <p style={{ ...styles.message, color: token ? "green" : "#ef4444" }}>{message}</p>
        )}
      </form>
    </div>
  );
};

const styles = {
  
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    background: "linear-gradient(to right, #e0eafc, #cfdef3)",
    padding: "20px",
  },
  formBox: {
    backgroundColor: "#ffffff",
    padding: "40px",
    borderRadius: "16px",
    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
    width: "100%",
    maxWidth: "420px",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  title: {
    fontSize: "28px",
    fontWeight: "700",
    color: "#1f2937",
    textAlign: "center",
  },

  inputGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },
  label: {
    fontSize: "15px",
    fontWeight: "500",
    color: "#374151",
  },
  input: {
    padding: "12px",
    fontSize: "16px",
    borderRadius: "8px",
    border: "1px solid #d1d5db",
    backgroundColor: "#f9fafb",
    outline: "none",
  },
  button: {
    padding: "12px",
    fontSize: "16px",
    fontWeight: "600",
    backgroundColor: "#3b82f6",
    color: "#ffffff",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
  message: {
    fontSize: "14px",
    textAlign: "center",
    marginTop: "10px",
  },
  
};

export default SimpleLogin;
