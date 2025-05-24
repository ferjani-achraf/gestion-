import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [id, setId] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("etudiant");
  const [classe, setClasse] = useState("");
  const [enseignantClasses, setEnseignantClasses] = useState([]);
  const [enseignantMatieres, setEnseignantMatieres] = useState([]);
  const [classes, setClasses] = useState([]);
  const [matieres, setMatieres] = useState([]);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:3000/api/classes")
      .then(response => setClasses(response.data))
      .catch(error => console.error("Erreur de chargement des classes", error));

    axios.get("http://localhost:3000/api/matieres")
      .then(response => setMatieres(response.data))
      .catch(error => console.error("Erreur de chargement des matières", error));
  }, []);

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      await axios.post("http://localhost:3000/api/register-request", {
        id,
        username,
        password,
        role,
        classe: role === "etudiant" ? classe : null,
        enseignant_classes: role === "enseignant" ? enseignantClasses : null,
        enseignant_matieres: role === "enseignant" ? enseignantMatieres : null,
      });

      setMessage("Demande d'inscription envoyée, veuillez attendre l'approbation.");
      navigate("/");
    } catch (error) {
      setMessage(error.response?.data?.message || "Erreur lors de la demande.");
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleRegister} style={styles.formBox}>
        <h2 style={styles.title}>Créer une demande de compte</h2>
        <input style={styles.input} type="text" placeholder="ID" value={id} onChange={(e) => setId(e.target.value)} required />
        <input style={styles.input} type="text" placeholder="Nom d'utilisateur" value={username} onChange={(e) => setUsername(e.target.value)} required />
        <input style={styles.input} type="password" placeholder="Mot de passe" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <select style={styles.select} value={role} onChange={(e) => setRole(e.target.value)} required>
          <option value="etudiant">Étudiant</option>
          <option value="enseignant">Enseignant</option>
        </select>

        {role === "etudiant" && (
          <select style={styles.select} value={classe} onChange={(e) => setClasse(e.target.value)} required>
            <option value="">-- Choisir une classe --</option>
            {classes.map(cl => (
              <option key={cl.id} value={cl.nom}>{cl.nom}</option>
            ))}
          </select>
        )}

        {role === "enseignant" && (
          <div style={styles.section}>
            <h4 style={styles.sectionTitle}>Choisir les classes :</h4>
            {classes.map(cl => (
              <label key={cl.id} style={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  value={cl.nom}
                  checked={enseignantClasses.includes(cl.nom)}
                  onChange={(e) => {
                    if (e.target.checked)
                      setEnseignantClasses([...enseignantClasses, e.target.value]);
                    else
                      setEnseignantClasses(enseignantClasses.filter(n => n !== e.target.value));
                  }}
                /> {cl.nom}
              </label>
            ))}

            <h4 style={styles.sectionTitle}>Choisir les matières :</h4>
            {matieres.map(m => (
              <label key={m.id} style={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  value={m.id}
                  checked={enseignantMatieres.includes(m.id)}
                  onChange={(e) => {
                    const id = parseInt(e.target.value);
                    if (e.target.checked)
                      setEnseignantMatieres([...enseignantMatieres, id]);
                    else
                      setEnseignantMatieres(enseignantMatieres.filter(mid => mid !== id));
                  }}
                /> {m.nom}
              </label>
            ))}
          </div>
        )}

        <button type="submit" style={styles.button}>Envoyer la demande</button>
        {message && <p style={styles.message}>{message}</p>}
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
    padding: "20px",
},

  formBox: {
    backgroundColor: "#ffffff",
    padding: "40px",
    borderRadius: "12px",
    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
    width: "100%",
    maxWidth: "500px",
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  title: {
    fontSize: "24px",
    fontWeight: "600",
    color: "#1f2937",
    textAlign: "center",
    marginBottom: "20px",
  },
  input: {
    padding: "12px",
    fontSize: "16px",
    borderRadius: "8px",
    border: "1px solid #d1d5db",
    backgroundColor: "#f9fafb",
    outline: "none",
  },
  select: {
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
    color: "white",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    marginTop: "10px",
  },
  section: {
    marginTop: "10px",
  },
  sectionTitle: {
    fontSize: "16px",
    fontWeight: "600",
    color: "#111827",
    marginBottom: "8px",
  },
  checkboxLabel: {
    display: "block",
    marginBottom: "6px",
    fontSize: "14px",
    color: "#374151",
  },
  message: {
    marginTop: "10px",
    fontSize: "14px",
    textAlign: "center",
    color: "#ef4444",
  },

};

export default RegisterPage;
