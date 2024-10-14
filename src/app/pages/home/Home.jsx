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
import HelpModal from '../../../components/guides/HelpPopUp';

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
  // State for the selected section (upload or mask). Other, not selected part will be not usable and its css values changes.
  const [selectedSection, setSelectedSection] = useState(null);
  // State for the selected questionnaire type
  const [selectedQuestionnaireType, setSelectedQuestionnaireType] = useState(QUESTIONNAIRE_TYPE.NONE);
  // State for controlling the visibility of modals
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
    // Pass files to workspace
      await DataService.loadDataFromFile(workspace, file, selectedQuestionnaireType);
    } catch (error) {
      console.error("error");
    }
  };

  return (
    <>
    {/* Help-Button */}
      <IconButton onClick={handleOpenHelp} className="helpIcon">
        <HelpOutlineIcon />
      </IconButton>

      {/* Logo */}
      <div>
        <img 
          src="/Logo_UsabilityAnalyzer_black.png"
          className="logo"
          alt="Usability Analyzer Logo"
        />
      </div>
      {/* Title and Slogan */}
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

        <div className="dataUploadSection">
          {/* Left side of data import functionality. Section to upload data. */}
          <div className={`fieldDataFile ${selectedSection === 'mask' ? 'disabled-section' : ''}`}>
            <h2>Hier können Sie Ihre Daten hochladen.</h2>
            <p>1. Wählen Sie einen Usability-Fragebogen.</p>
            {/* Update Usability Questionaire Type */}
            <select 
              id="questionnaire-type" 
              name="questionnaire-type" 
              disabled={selectedSection === 'mask'} 
              onChange={(e) => {
                setSelectedSection('upload');
                setSelectedQuestionnaireType(QUESTIONNAIRE_TYPE[e.target.value]);
              }}>
              <option value={"NONE"}>-- Bitte wählen --</option>
              <option value={"UEQ"}>User Experience Questionnaire (UEQ)</option>
              <option value={"SUS"}>System Usability Scale (SUS)</option>
              <option value={"NPS"}>Net Promoter Score (NPS)</option>
              <option value={"rawTLX"}>RAW Task Load Index</option>
            </select>
            <br />
            {/* Upload csv */}
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
            {/* Link to workspace */}
            <Link to="/workspace">
              <button className="button" disabled={selectedSection === 'mask'}>
                Analyse Starten
              </button>
            </Link>
          </div>

          <div className="separator"></div>

          {/* Right side of data import functionality. Mask for data import */}
          <div className={`fieldDataFile ${selectedSection === 'upload' ? 'disabled-section' : ''}`}>
            <h2>Hier können Sie Ihre Daten über eine Maske eingeben.</h2>
            <p>1. Wählen Sie einen Usability-Fragebogen.</p>
            {/* Update Usability Questionaire Type */}
            <select 
              id="questionnaire-type" 
              name="questionnaire-type" 
              disabled={selectedSection === 'upload'} 
              onChange={(e) => {
                setSelectedSection('mask'); 
                setSelectedQuestionnaireType(QUESTIONNAIRE_TYPE[e.target.value]);}}>
              <option value={"NONE"}>-- Bitte wählen --</option>
              <option value={"UEQ"}>User Experience Questionnaire (UEQ)</option>
              <option value={"SUS"}>System Usability Scale (SUS)</option>
              <option value={"NPS"}>Net Promoter Score (NPS)</option>
              <option value={"rawTLX"}>RAW Task Load Index</option>
            </select>
            <br />
            {/* Fill Mask */}
            <p>
              2. Befüllen Sie Ihre Maske. 
              Für Informationen zum Datei-Format klicken Sie 
              <span className="link" onClick={handleOpenUserDataFormat} style={{ cursor: 'pointer', color: 'blue'}}> hier</span>.
              <br /> 
              Befüllen Sie nur die erforderliche Fragenanzahl für Ihren jeweiligen Fragebogen (z.B. SUS beinhaltet 10 Fragen).  
              <br /> <b>BEVOR SIE DEN BUTTON "ANALYSE STARTEN" KLICKEN, SICHERN SIE DIE TABELLE MIT DEM ZUGEHÖRIGEN BUTTON. "TABELLE SICHERN" funktioniert nur wenn der Bearbeitungsmodus eines Feldes mit der Eingabe-Taste beendet wurde.</b>
            </p>
            {/* Function for Mask */}
            <NewRowMaker selectedQuestionnaireType={selectedQuestionnaireType} />
            <br /><br />
            {/* Link to workspace */}
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
        <br />
        Logo created with Microsoft Designer (https://designer.microsoft.com/image-creator)
      </p>
      
      <HelpModal open={isHelpOpen} onClose={handleCloseHelp} />

      <FormatGuide
        open={isUserDataFormatOpen}
        onClose={handleCloseUserDataFormat}
      />

    </>
  );
}

export default Home;