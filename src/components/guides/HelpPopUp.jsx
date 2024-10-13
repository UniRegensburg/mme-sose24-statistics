import { Box, Modal } from "@mui/material";

export default function HelpModal({ open, onClose }) {
  return (
    <Modal open={open} onClose={onClose}>
      <Box className="modal-box" sx={{ maxHeight: '80vh', overflowY: 'auto' }}>
        <h2>Hilfe</h2>
        <p>
          Hierbei handelt es sich um ein Tool zur Analyse Ihrer Usability-Daten. 
          Laden Sie Ihre Daten hoch und nutzen Sie die umfassenden Auswertungsfunktionen. 
          Bei Fragen oder Anliegen stehen wir Ihnen gerne zur Verfügung. Im folgenden werden die grundlegenden Funktionen dieser Website beschrieben.
        </p>
        <h3>Startseite</h3>
        <p>Auf der Startseite können Sie wählen, ob Sie Daten aus einer externen CSV-Datei importieren (mit dem Panel auf der linken Seite) oder Ihre eigenen Daten mit der Maske auf der rechten Seite erstellen möchten. Informationen zu den unterstützten Formaten und Fragebogentypen sind direkt bei den Upload/Masken-Feldern platziert.</p>
        <h3>Datenanalyse</h3>
        <p>Nachdem Sie Ihre Daten hochgeladen haben, können Sie über "Analyse Starten" diese auswerten. Folgende Möglichkeiten stehen Ihnen hierfür zur Verfügung: </p>
        <h4>Daten importieren:</h4> 
        <p>Verwenden Sie die Schaltfläche „IMPORTIEREN“, um CSV-Daten zu importieren. Die Anwendung generiert eine eindeutige ID für jede Zeile, wenn Ihre Daten keine Spalte mit dem Namen „id“ enthalten.</p>
        <h4>Daten bearbeiten:</h4> 
        <p>Doppelklicken Sie auf Tabellenzellen, um deren Werte zu bearbeiten. Verwenden Sie die Schaltfläche „DATEN EINSTELLUNGEN“, um Spalten hinzuzufügen/löschen oder um den Fragebogentyp zu ändern.</p>
        <h4>Datenumwandlung:</h4>
        <p>Im Panel „DATEN EINSTELLUNGEN“ können Sie Ihre Tabellenwerte transformieren. Sie können Formeln eingeben, um eine Transformation zu erstellen. Unterstützt werden die folgenden Funktionen. Die gleichen Informationen finden Sie auch, wenn Sie auf die Schaltfläche „Hilfe“ im Feld „DATEN EINSTELLUNGEN“ klicken.</p>
        <ul>
          <li>- SCORE: Questionnaire score corresponding to its type.</li>
          <li>- SCALE: Standardize data.</li>
          <li>- AVG: Average value.</li>
          <li>- SD: Standard deviation.</li>
          <li>- MAX: Maximum value.</li>
          <li>- MIN: Minimum value.</li>
          <li>- ABS: Absolute value.</li>
          <li>- FLOOR: Floor function.</li>
          <li>- LOG: Logarithm with base e.</li>
          <li>- EXP: Exponential function.</li>
          <li>- SIN: Sine function.</li>
          <li>- COS: Cosine function.</li>
        </ul>
        <h4>Plotten:</h4>
        <p>Auf der rechten Seite befindet sich das Feld Diagrammtyp. Sie können eine Art von Diagramm auswählen und die erforderlichen Informationen eingeben. Wenn Sie Ihre Daten bearbeiten, werden sich die Diagramme dynamisch ändern.</p>
        <h4>Datenbericht:</h4>
        <p>Klicken Sie auf die Schaltfläche „DATEN-REPORT“, um weitere Informationen über Ihre Daten zu erhalten. Wenn Sie den Typ Ihres Fragebogens festgelegt haben, wird auch der Score für Ihre Daten berechnet.
        </p>
        <button onClick={onClose} className="button">Schließen</button>
      </Box>
    </Modal>
  );
}
