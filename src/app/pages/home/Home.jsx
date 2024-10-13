import { useState } from 'react';
import { Link } from 'react-router-dom';
import { IconButton, Modal, Box } from '@mui/material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { useWorkspaceContext } from '../../../providers/WorkspaceProvider';
import DataService from '../../../services/DataService';
import QUESTIONNAIRE_TYPE from "../../../constants/QuestionnaireType";
import NewRowMaker from "./MaskImport";
import './Home.css';
import FormatGuide from '../../../components/guides/FormatGuide';

/**
 * Main component for home page. Landing Page.
 * 
 * @returns Rendered react component.
 */

function Home() {
  // ---------- Danger zone starts here ----------
  const { workspace } = useWorkspaceContext();
  // ---------- Danger zone ends here ----------

  // State management
  const [selectedSection, setSelectedSection] = useState(null);
  const [selectedQuestionnaireType, setSelectedQuestionnaireType] = useState(QUESTIONNAIRE_TYPE.NONE);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [isUserDataFormatOpen, setIsUserDataFormatOpen] = useState(false);

  // Modal handlers
  const handleOpenHelp = () => setIsHelpOpen(true);
  const handleCloseHelp = () => setIsHelpOpen(false);
  const handleOpenUserDataFormat = () => setIsUserDataFormatOpen(true);
  const handleCloseUserDataFormat = () => setIsUserDataFormatOpen(false);

  // File uploader
  const fileUploader = async (event) => {
    const file = event.target.files[0];
    try {
      await DataService.loadDataFromFile(workspace, file, selectedQuestionnaireType);
    } catch (error) {
      console.error("error");
    }
  };

  return (
    <>
      <IconButton onClick={handleOpenHelp} className="helpIcon">
        <HelpOutlineIcon />
      </IconButton>

      {/* Modal for Help-Icon */}
      <Modal open={isHelpOpen} onClose={handleCloseHelp}>
        <Box className="modal-box" sx ={{maxHeight: '80vh', overflowY: 'auto'}}>
          <h2>Hilfe</h2>
          <p>
            Hierbei handelt es sich um ein Tool zur Analyse Ihrer Usability-Daten. 
            Laden Sie Ihre Daten hoch und nutzen Sie die umfassenden Auswertungsfunktionen. 
            Bei Fragen oder Anliegen stehen wir Ihnen gerne zur Verfügung. Im folgenden werden die grundlegenden Funktionen dieser Website beschrieben.
          </p>
          <h3>Startseite</h3>
          <p>Auf der Startseite können Sie wählen, ob Sie Daten aus einer externen CSV-Datei importieren (mit dem Panel auf der linken Seite) oder Ihre eigenen Daten mit der Maske auf der rechten Seite erstellen möchten.Die unterstützten Formate und Fragebogentypen sind wie folgt. Diese Informationen finden Sie auch auf der Startseite.</p>
          <h3>Datenanalyse</h3>
          <p>Nachdem Sie Ihre Daten hochgeladen haben, können Sie über "Analyse Starten" diese auswerten. Folgende Möglichkeiten stehen Ihnen zur Verfügung.</p>
          <h4>Daten importieren:</h4> 
          <p>Verwenden Sie die Schaltfläche „IMPORTIEREN“, um CSV-Daten zu importieren. Die Anwendung generiert eine eindeutige ID für jede Zeile, wenn Ihre Daten keine Spalte mit dem Namen „id“ enthalten.</p>
          <h4>Daten bearbeiten:</h4> 
          <p>Doppelklicken Sie auf Tabellenzellen, um deren Werte zu bearbeiten. Verwenden Sie die Schaltfläche „DATEN EINSTELLUNGEN“, um Spalten hinzuzufügen/löschen oder um den Fragebogentyp zu ändern.</p>
          <h4>Datenumwandlung:</h4>
          <p>Im Panel „DATEN EINSTELLUNGEN“ finden Sie ein Feld „Transformierung hinzufügen“. Sie können Formeln eingeben, um eine Transformation zu erstellen. Unterstützt werden die folgenden Funktionen. Die gleichen Informationen finden Sie auch, wenn Sie auf die Schaltfläche „Hilfe“ im Feld „DATEN EINSTELLUNGEN“ klicken.</p>
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
          <p>Auf der rechten Seite befindet sich das Feld Diamgrammtyp. Sie können eine Art von Diagramm auswählen und die erforderlichen Informationen eingeben. Wenn Sie Ihre Daten bearbeiten, werden sich die Diagramme dynamisch ändern.</p>
          <h4>Datenbericht:</h4>
          <p>Klicken Sie auf die Schaltfläche „DATEN-REPORT“, um weitere Informationen über Ihre Daten zu erhalten. Wenn Sie den Typ Ihres Fragebogens festgelegt haben, wird auch der Score für Ihre Daten berechnet.
          </p>
          <button onClick={handleCloseHelp} className="button">Schließen</button>
        </Box>
      </Modal>

      {/* <p className="darkmode">Darkmode Reminder</p> */}

      {/* Logo */}
      <div>
        <img 
          src="/Logo_UsabilityAnalyzer_black.png"
          className="logo"
          alt="Usability Analyzer Logo"
        />
      </div>

      <h1>Usability Analyzer</h1>
      <p>Das Tool für schnelle und unkomplizierte Auswertung von Usability-Daten</p>

      <div className="card">
        {/* Info Field */}
        <div className="fieldDataFile" style={{ textAlign: 'center', width: '96%' }}>
          <p>
            Wir bieten Ihnen ein Tool zur Analyse von Usability-Daten aus Fragebögen. 
            Diese Anwendung unterstützt die Auswertung von User Experience Questionnaire (UEQ), 
            System Usability Scale (SUS), Net Promoter Score (NPS) und RAW Task Load Index.
          </p>
        </div>

        {/* Choose Usability Data */}
        <div className="buttonColumn">
          {/* Upload Usability Data */}
          <div className={`fieldDataFile ${selectedSection === 'mask' ? 'disabled-section' : ''}`}>
            <h2>Hier können Sie Ihre Daten hochladen.</h2>
            <p>1. Wählen Sie einen Usability-Fragebogen.</p>
            <select 
              id="questionnaire-type" 
              name="questionnaire-type" 
              disabled={selectedSection === 'mask'} 
              onChange={(e) => {
                setSelectedSection('upload');
                setSelectedQuestionnaireType(QUESTIONNAIRE_TYPE[e.target.value]);
              }}
            >
              <option value={"NONE"}>-- Bitte wählen --</option>
              <option value={"UEQ"}>User Experience Questionnaire (UEQ)</option>
              <option value={"SUS"}>System Usability Scale (SUS)</option>
              <option value={"NPS"}>Net Promoter Score (NPS)</option>
              <option value={"rawTLX"}>RAW Task Load Index</option>
            </select>
            <br />
            <p>
              2. Laden Sie eine CSV-Datei hoch. 
              Für Informationen zum Datei-Format klicken Sie 
              <span className="link" onClick={handleOpenUserDataFormat} style={{ cursor: 'pointer', color: 'blue' }}> hier</span>.
            </p>
            <input 
              type="file" 
              accept=".csv" 
              onChange={(event) => { setSelectedSection('upload'); fileUploader(event); }} 
              disabled={selectedSection === 'mask'} 
            />
            <br /><br />
            <Link to="/workspace">
              <button className="button" disabled={selectedSection === 'mask'}>
                Analyse Starten
              </button>
            </Link>
          </div>

          <div className="separator"></div>

          <div className={`fieldDataFile ${selectedSection === 'upload' ? 'disabled-section' : ''}`}>
            {/* Mask for Usability Data */}
            <h2>Hier können Sie Ihre Daten über eine Maske eingeben.</h2>
            <p>1. Wählen Sie einen Usability-Fragebogen. Kein Upload notwendig!</p>
            <select 
              id="questionnaire-type" 
              name="questionnaire-type" 
              disabled={selectedSection === 'upload'} 
              onChange={(e) => {
                setSelectedSection('mask'); 
                setSelectedQuestionnaireType(QUESTIONNAIRE_TYPE[e.target.value]);
              }}
            >
              <option value={"NONE"}>-- Bitte wählen --</option>
              <option value={"UEQ"}>User Experience Questionnaire (UEQ)</option>
              <option value={"SUS"}>System Usability Scale (SUS)</option>
              <option value={"NPS"}>Net Promoter Score (NPS)</option>
              <option value={"rawTLX"}>RAW Task Load Index</option>
            </select>
            <br />
            <p>
              2. Befüllen Sie Ihre Maske. 
              Für Informationen zum Datei-Format klicken Sie 
              <span className="link" onClick={handleOpenUserDataFormat} style={{ cursor: 'pointer', color: 'blue' }}> hier</span>. 
              Befüllen Sie nur die erforderliche Fragenanzahl für Ihren jeweiligen Fragebogen (z.B. SUS beinhaltet 10 Fragen).  
              <br /> <b>BEVOR SIE DEN BUTTON "ANALYSE STARTEN" KLICKEN, SICHERN SIE DIE TABELLE MIT DEM ZUGEHÖRIGEN BUTTON. "TABELLE SICHERN" funktioniert nur wenn der Bearbeitungsmodus eines Feldes mit der Eingabe-Taste beendet wurde.</b>
            </p>
            <NewRowMaker selectedQuestionnaireType={selectedQuestionnaireType} />
            <br /><br />
            <Link to="/workspace">
              <button className="button" disabled={selectedSection === 'upload'}>
                Analyse Starten
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Reload Button */}
      <div className="refresh-section">
        <button className="button" onClick={() => window.location.reload()}>
          Seite neu laden
        </button>
      </div>

      <p className="copyrightInfo">
        © 2024 Reginleif Klein, Sebastian Scherübl, Ruoyu Xu
      </p>

      <FormatGuide
        open={isUserDataFormatOpen}
        onClose={handleCloseUserDataFormat}
      />

    </>
  );
}

export default Home;