import React, { useEffect, useState } from "react";
import axios from "axios";

const SaisirNotes = ({ enseignantId }) => {
  const [classes, setClasses] = useState([]);
  const [classe, setClasse] = useState("");
  const [matieres, setMatieres] = useState([]);
  const [matiereId, setMatiereId] = useState("");
  const [etudiants, setEtudiants] = useState([]);
  const [notes, setNotes] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios.get(`http://localhost:3000/api/enseignant-classes/${enseignantId}`)
      .then(res => setClasses(res.data))
      .catch(err => console.error(err));

    axios.get("http://localhost:3000/api/matieres")
      .then(response => setMatieres(response.data))
      .catch(error => console.error("Erreur de chargement des matières", error));
  }, []);

  const handleClasseChange = async (e) => {
    const selectedClasse = e.target.value;
    setClasse(selectedClasse);
    try {
      const res = await axios.get(`http://localhost:3000/api/etudiants/${selectedClasse}`);
      setEtudiants(res.data);
      setNotes(res.data.map(etud => ({ etudiant_id: etud.id, note: "" })));
    } catch (err) {
      console.error("Erreur chargement étudiants:", err);
    }
  };

  const handleNoteChange = (index, value) => {
    const updatedNotes = [...notes];
    updatedNotes[index].note = value;
    setNotes(updatedNotes);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/api/notes", {
        classe,
        enseignant_id: enseignantId,
        matiere_id: matiereId,
        notes,
      });
      setMessage("Notes enregistrées !");
    } catch (err) {
      setMessage("Erreur lors de l'enregistrement.");
    }
  };

  return (
    <div style={{ marginTop: "20px" }}>
      <h2>Saisir les notes</h2>

      <select value={classe} onChange={handleClasseChange} required>
        <option value="">-- Choisir une classe --</option>
        {classes.map((cl, i) => (
          <option key={i} value={cl.classe}>{cl.classe}</option>
        ))}
      </select>

      <select value={matiereId} onChange={(e) => setMatiereId(e.target.value)} required>
        <option value="">-- Choisir une matière --</option>
        {matieres.map((m, i) => (
          <option key={i} value={m.id}>{m.nom}</option>
        ))}
      </select>

      {etudiants.length > 0 && (
        <form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
          {etudiants.map((etudiant, index) => (
            <div key={etudiant.id} style={{ marginBottom: "10px" }}>
              <label>
                {etudiant.username} :{" "}
                <input
                  type="number"
                  min="0"
                  max="20"
                  value={notes[index].note}
                  onChange={(e) => handleNoteChange(index, e.target.value)}
                  required
                />
              </label>
            </div>
          ))}
          <button type="submit">Enregistrer les notes</button>
          {message && <p>{message}</p>}
        </form>
      )}
    </div>
  );
};

export default SaisirNotes;
