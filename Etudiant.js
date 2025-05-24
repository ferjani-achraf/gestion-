import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const EtudiantPage = () => {
  const navigate = useNavigate();
  const [cours, setCours] = useState([]);
  const [notes, setNotes] = useState([]);
  const [classe, setClasse] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const id = localStorage.getItem("id");

        const resClasse = await axios.get(`http://localhost:3000/api/user-classe/${id}`);
        const userClasse = resClasse.data.classe;
        setClasse(userClasse);

        const resCours = await axios.get(`http://localhost:3000/api/cours/${userClasse}`);
        setCours(resCours.data);

        const resNotes = await axios.get(`http://localhost:3000/api/note/${id}`);
        setNotes(resNotes.data);
      } catch (err) {
        console.error("Erreur lors du chargement :", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("id");
    navigate("/");
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Bienvenue sur l'espace étudiant</h1>
      <p style={styles.classeText}>
        Classe : <strong>{classe}</strong>
      </p>

      <section style={styles.section}>
        <h2 style={styles.subtitle}>Vos cours</h2>
        {loading ? (
          <p style={styles.infoText}>Chargement des cours...</p>
        ) : cours.length > 0 ? (
          cours.map((cours, index) => (
            <div key={index} style={styles.card}>
              <h3 style={styles.cardTitle}>{cours.titre}</h3>
              <p style={styles.cardContent}>{cours.contenu}</p>
            </div>
          ))
        ) : (
          <p style={styles.infoText}>Aucun cours disponible pour votre classe.</p>
        )}
      </section>

      <section style={styles.section}>
        <h2 style={styles.subtitle}>Vos notes</h2>
        {notes.length > 0 ? (
          notes.map((n, index) => (
            <div key={index} style={styles.card}>
              <h4 style={styles.cardTitle}>{n.titre}</h4>
              <p style={styles.cardContent}>
                Note : <strong>{n.note}</strong>
              </p>
            </div>
          ))
        ) : (
          <p style={styles.infoText}>Aucune note disponible.</p>
        )}
      </section>

      <button onClick={handleLogout} style={styles.logoutButton}>
        Se déconnecter
      </button>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: 700,
    margin: "40px auto",
    padding: 20,
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    color: "#2d3748",
    backgroundColor: "#f7fafc",
    borderRadius: 10,
    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
  },
  title: {
    fontSize: 32,
    marginBottom: 15,
    color: "#2b6cb0",
  },
  classeText: {
    fontSize: 18,
    marginBottom: 30,
  },
  section: {
    marginBottom: 40,
  },
  subtitle: {
    fontSize: 24,
    color: "#3182ce",
    marginBottom: 20,
    borderBottom: "2px solid #bee3f8",
    paddingBottom: 8,
  },
  card: {
    backgroundColor: "#fff",
    padding: 20,
    margin: "15px auto",
    maxWidth: 600,
    borderRadius: 8,
    boxShadow: "0 6px 15px rgba(66, 153, 225, 0.1)",
    textAlign: "left",
    transition: "transform 0.3s ease, boxShadow 0.3s ease",
    cursor: "default",
  },
  cardTitle: {
    color: "#2c5282",
    marginBottom: 10,
    fontWeight: "600",
  },
  cardContent: {
    fontSize: 16,
    color: "#4a5568",
  },
  infoText: {
    fontSize: 16,
    fontStyle: "italic",
    color: "#718096",
  },
  logoutButton: {
    backgroundColor: "#e53e3e",
    border: "none",
    color: "white",
    padding: "12px 28px",
    fontSize: 18,
    fontWeight: 600,
    borderRadius: 8,
    cursor: "pointer",
    boxShadow: "0 6px 15px rgba(229, 62, 62, 0.5)",
    transition: "background-color 0.3s ease, boxShadow 0.3s ease",
  },
};

export default EtudiantPage;
