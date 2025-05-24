import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AjouterCours from "./AjouterCours";
import SaisirNotes from "./SaisirNotes";

const EnseignantPage = () => {
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const enseignantId = localStorage.getItem("id");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("id");
    navigate("/");
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Bienvenue sur l'espace enseignant</h1>

      <div style={styles.buttonGroup}>
        <button onClick={() => setShowForm(!showForm)} style={styles.primaryButton}>
          {showForm ? "Cacher le formulaire" : "Ajouter un cours"}
        </button>

        <button onClick={() => setShowNotes(!showNotes)} style={styles.primaryButton}>
          {showNotes ? "Cacher les notes" : "Saisir les notes"}
        </button>
      </div>

      <div style={styles.section}>
        {showForm && <AjouterCours enseignantId={enseignantId} />}
        {showNotes && <SaisirNotes enseignantId={enseignantId} />}
      </div>

      <button onClick={handleLogout} style={styles.logoutButton}>
        Se déconnecter
      </button>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: 800,
    margin: "60px auto",
    padding: 30,
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    color: "#2d3748",
    textAlign: "center",
  },
  title: {
    fontSize: 32,
    color: "#2b6cb0",
    marginBottom: 40,
  },
  buttonGroup: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    flexWrap: "wrap",
    marginBottom: 30,
  },
  primaryButton: {
    padding: "12px 24px",
    fontSize: 16,
    backgroundColor: "#3182ce",
    color: "#fff",
    border: "none",
    borderRadius: 8,
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
  logoutButton: {
    marginTop: 40,
    padding: "12px 24px",
    fontSize: 16,
    backgroundColor: "#e53e3e",
    color: "#fff",
    border: "none",
    borderRadius: 8,
    cursor: "pointer",
    boxShadow: "0 6px 12px rgba(229, 62, 62, 0.3)",
  },
  section: {
    marginTop: 30,
    textAlign: "left",
  },
};

export default EnseignantPage;
