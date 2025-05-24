import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminPage = () => {
  const [requests, setRequests] = useState([]);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/register-requests");
        setRequests(response.data);
      } catch (error) {
        setMessage("Erreur de récupération des demandes.");
      }
    };

    fetchRequests();
  }, []);

  const handleApprove = async (id) => {
    try {
      await axios.post("http://localhost:3000/api/approve-request", { id });
      setMessage("✅ Demande approuvée !");
      setRequests((prev) => prev.filter((r) => r.id !== id));
    } catch (error) {
      setMessage("❌ Erreur lors de l'approbation.");
    }
  };

  const handleReject = async (id) => {
    try {
      await axios.post("http://localhost:3000/api/reject-request", { id });
      setMessage("❌ Demande rejetée.");
      setRequests((prev) => prev.filter((r) => r.id !== id));
    } catch (error) {
      setMessage("Erreur lors du rejet.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Gestion des demandes d'inscription</h2>
      {message && <p style={styles.message}>{message}</p>}

      {requests.length > 0 ? (
        <ul style={styles.list}>
          {requests.map((request) => (
            <li key={request.id} style={styles.listItem}>
              <div>
                <strong>{request.username}</strong> ({request.role}) - ID: {request.id}
              </div>
              <div style={styles.buttonGroup}>
                <button onClick={() => handleApprove(request.id)} style={styles.approveButton}>
                  Approuver
                </button>
                <button onClick={() => handleReject(request.id)} style={styles.rejectButton}>
                  Rejeter
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p style={{ fontStyle: "italic" }}>Aucune demande en attente.</p>
      )}

      <button onClick={handleLogout} style={styles.logoutButton}>
        Se déconnecter
      </button>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "800px",
    margin: "60px auto",
    padding: "30px",
    backgroundColor: "#f8f9fa",
    borderRadius: "10px",
    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.05)",
    fontFamily: "'Segoe UI', sans-serif",
    color: "#2d3748",
    textAlign: "center",
  },
  title: {
    fontSize: "28px",
    marginBottom: "30px",
    color: "#2b6cb0",
  },
  message: {
    marginBottom: "20px",
    fontWeight: "bold",
    color: "#555",
  },
  list: {
    listStyle: "none",
    padding: 0,
    margin: "0 auto 40px auto",
  },
  listItem: {
    backgroundColor: "#ffffff",
    borderRadius: "8px",
    padding: "20px",
    marginBottom: "15px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
  },
  buttonGroup: {
    display: "flex",
    gap: "10px",
  },
  approveButton: {
    padding: "8px 16px",
    backgroundColor: "#38a169",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  rejectButton: {
    padding: "8px 16px",
    backgroundColor: "#e53e3e",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  logoutButton: {
    marginTop: "20px",
    padding: "12px 24px",
    fontSize: "16px",
    backgroundColor: "#718096",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
};

export default AdminPage;
