import { useState } from 'react'
import reactLogo from '../../../assets/react.svg'
import viteLogo from '/vite.svg'
import './Home.css'
import { Link } from 'react-router-dom'
import { IconButton, Modal, Box, Typography } from '@mui/material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { useWorkspaceContext } from '../../../providers/WorkspaceProvider'
import DataService from '../../../services/DataService'
import QUESTIONNAIRE_TYPE from "../../../constants/QuestionnaireType"
{/*import workspaceEntity from '../../../entities/WorkspaceEntity'*/}
import NewRowMaker from "./MaskImport"
import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import {
  randomCreatedDate,
  randomTraderName,
  randomUpdatedDate,
} from '@mui/x-data-grid-generator';

//erforderlich npm install @mui/x-data-grid-generator



/**
 * Main component for home page. Landing Page.
 * 
 * @returns Rendered react component.
 */
function Home() {
  // ---------- Danger zone starts here ----------
  const { workspace } = useWorkspaceContext()

  // ---------- Danger zone ends here ----------

  // DataImport via the async in DataService.js
  //No need for Initialization
  {/*const dataService = new DataService();*/}


  const fileUploader = async (event) => {
    const file = event.target.files[0];
    if (file){
    const newURL = URL.createObjectURL(file);
    try{
      const importedData = await DataService.importData(newURL);
      workspace.setDataEntity(importedData);
      {/*setWorkspace({ csvData: dataEntity.data });*/}
    }catch (error) {
      console.error("error");
    }
    }
  }
  //Disable a section (Upload/Mask) if the other is filled
  const [selectedSection, setSelectedSection] = useState(null);
  
  // Control if modal (help/formatinfo) is closed
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [isUserDataFormatOpen, setIsUserDataFormatOpen] = useState(false);
  const handleOpenHelp = () => setIsHelpOpen(true);
  const handleCloseHelp = () => setIsHelpOpen(false);
  const handleOpenUserDataFormat = () => setIsUserDataFormatOpen(true);
  const handleCloseUserDataFormat = () => setIsUserDataFormatOpen(false);

  return (
    <>
      <IconButton onClick={handleOpenHelp} className="helpIcon">
        <HelpOutlineIcon />
      </IconButton>

      {/* Modal for Help-Icon*/}
      <Modal open={isHelpOpen} onClose={handleCloseHelp}>
        <Box className="modal-box">
          <p>Hilfe</p>
          <p>
            Bei dieser Seite handelt es sich, um ein Tool, dass dir dabei hilft deine Usability-Daten auszuwerten. Lade Sie hoch und profitiere von den Auswertungsfunktionen. Falls du Fragen hast Melde dich sehr gerne bei uns.
          </p>
          <button onClick={handleCloseHelp} className="button">Schließen</button>
        </Box>
      </Modal>
      <p className="darkmode">Darkmode-Reminder</p>
      {/*Logo*/}
      <div>
      <img src="/Logo_UsabilityAnalyzer.jpeg" className="logo" alt="Usability Analyzer Logo" />
      </div>
      <h1>Usability Analyzer</h1>
      <p>
        Dein Tool, um schnell und unkompliziert Usability-Daten auzuswerten
      </p>
      <div className="card">
        {/* Info_field*/}
        <div className="fieldDataFile" style={{ textAlign: 'center'}}>
          <p> Wir stellen dir hier ein Tool zur Verfügung, um deine Usability-Daten aus Fragebögen auszuwerten. Diese Anwendung ist für User Experience Questionnaire (UEQ), System Usability Scale (SUS), Net Promoter Score (NPS) und RAW Task Load Index geeignet. 
            </p>
          {/*<button className="button">
            Upload demographic data
          </button>*/}
        </div>
        {/* Choose Usability Data*/}
        <div className="buttonColumn">
          {/* Upload Usability Data*/}
          <div className={`fieldDataFile ${selectedSection === 'mask' ? 'disabled-section' : ''}`}>
            <h2>Hier kannst du deine Daten hochladen.</h2>
            <p>1. Wähle deinen Usability-Fragebogen.</p>
            <select id="questionnaire-type" name="questionnaire-type" disabled={selectedSection === 'mask'} onChange={() => setSelectedSection('upload')}>
              <option value="">-- Bitte wählen --</option>
              <option value="type1">User Experience Questionnaire (UEQ)</option>
              <option value="type2">System Usability Scale (SUS)</option>
              <option value="type3">Net Promoter Score (NPS)</option>
              <option value="type3">RAW Task Load Index</option>
            </select>
            <br />
            <p>2. Lade deine csv-Datei hoch. Für Informationen zum Datei-Format klicke 
              <span className="link" onClick={handleOpenUserDataFormat} style={{ cursor: 'pointer', color: 'blue' }}>hier</span>.</p>
            {/* Datei-Upload-Button*/} 
           <input type="file" accept={".csv"} onChange={(event) => {setSelectedSection('upload'); fileUploader(event);}}  disabled={selectedSection === 'mask'}/>
            <br />
            <br />
            <Link to="/workspace">
            <button className="button" disabled={selectedSection === 'mask'}>
            Start to Analyse
          </button >
          </Link>
          </div>
          <div className="separator"></div>
          <div className={`fieldDataFile ${selectedSection === 'upload' ? 'disabled-section' : ''}`}>
            {/* Mask for Usability Data*/}
            <h2>Hier kannst du über eine Maske Daten eingeben.</h2>
            <p>1. Wähle deinen Usability-Fragebogen.</p>
            <select id="questionnaire-type" name="questionnaire-type" disabled={selectedSection === 'upload'} onChange={() => setSelectedSection('mask')}>
              <option value="">-- Bitte wählen --</option>
              <option value="type1">User Experience Questionnaire (UEQ)</option>
              <option value="type2">System Usability Scale (SUS)</option>
              <option value="type3">Net Promoter Score (NPS)</option>
              <option value="type3">RAW Task Load Index</option>
            </select>
            <br />
            <p>2. Befülle die Maske. Für Informationen zum Datei-Format klicke <span className="link" onClick={handleOpenUserDataFormat} style={{ cursor: 'pointer', color: 'blue' }}>hier</span>.</p>
            <NewRowMaker/>
            <br />
            <br />
            <br />
            <Link to="/workspace">
            <button className="button" disabled={selectedSection === 'upload'}>
            Start to Analyse
          </button >
          </Link>
          </div>
        </div>
      </div>
      {/* use Link for redirecting ÜBERARBEITEN!!!!*/}
      <div className="refresh-section">
      <button className="button" onClick={() => window.location.reload()}>
        Refresh
      </button>
      </div>
      <p className="copyrightInfo">
        Impressum!!!!!!!!!!!!!!!!!!!!!
      </p>
      <Modal open={isUserDataFormatOpen} onClose={handleCloseUserDataFormat}>
            <Box className="modal-box">
              <h1>Datenformat</h1>
              <p>
              <p>Zugelassen sind nur csv-Dateien. Diese müssen für die Analyse im folgenden Format vorliegen. Spalte 1-3 enthalten die demographischen Informationen, die darauffolgenden, die Antowrten der Fragebögen. 
                Beispielhaft ist hier der SUS gelistet, die anderen Fragebögen sind analog zu beachten, nur mit angepasster Fragenanzahl.</p>
                <table className="exampleTable">
                  <tbody>
                    <tr>
                      <td>ID1</td>
                      <td>25</td>
                      <td>W</td>
                      <td>1</td>
                      <td>2</td>
                      <td>3</td>
                      <td>4</td>
                      <td>5</td>
                      <td>1</td>
                      <td>2</td>
                      <td>4</td>
                      <td>2</td>
                      <td>5</td>
                    </tr>
                    <tr>
                      <td>ID2</td>
                      <td>30</td>
                      <td>W</td>
                      <td>3</td>
                      <td>3</td>
                      <td>3</td>
                      <td>4</td>
                      <td>5</td>
                      <td>2</td>
                      <td>1</td>
                      <td>4</td>
                      <td>2</td>
                      <td>1</td>
                    </tr>
                    <tr>
                      <td>ID3</td>
                      <td>22</td>
                      <td>M</td>
                      <td>5</td>
                      <td>4</td>
                      <td>3</td>
                      <td>2</td>
                      <td>5</td>
                      <td>3</td>
                      <td>2</td>
                      <td>3</td>
                      <td>2</td>
                      <td>1</td>
                    </tr>
                  </tbody>
                </table>
              </p>
              <button onClick={handleCloseUserDataFormat} className="button">Schließen</button>
            </Box>
          </Modal>

      {/*<p><button onClick={() => setCount((count) => count + 1)}>
          Upload User-Data {count}
        </button>
        
          Edit <code>src/app/pages/home/Home.jsx</code> and save to test HMR
        </p>*/}

    
    </>
  )


  
}


export default Home
