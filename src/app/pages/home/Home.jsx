import { useState } from 'react'
import reactLogo from '../../../assets/react.svg'
import viteLogo from '/vite.svg'
import './Home.css'
import { Link } from 'react-router-dom'
import { IconButton, Modal, Box, Typography } from '@mui/material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { useWorkspaceContext } from '../../../providers/WorkspaceProvider'
import DataService from '../../../services/DataService'
{/*import workspaceEntity from '../../../entities/WorkspaceEntity'*/}



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

  
  // Control if modal is closed
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
        {/* Modal for Info UserData*/}
        <div className="fieldDataFile">
          <p> Wir stellen dir hier ein Tool zur Verfügung, um deine Usability-Daten aus Fragebögen auszuwerten. Diese Anwendung ist für User Experience Questionnaire (UEQ), System Usability Scale (SUS), Net Promoter Score (NPS) und RAW Task Load Index geeignet. Für den erforderlichen Aufbau der Datei klicke <span className="link" onClick={handleOpenUserDataFormat} style={{ cursor: 'pointer', color: 'blue' }}>hier</span>.</p>
          <Modal open={isUserDataFormatOpen} onClose={handleCloseUserDataFormat}>
            <Box className="modal-box">
              <p>Datenformat</p>
              <p>
                Zugelassen sind nur csv-Dateien. Diese müssen für die Analyse im folgenden Format vorliegen.
                <table className="exampleTable">
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>25</td>
                      <td>M</td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>30</td>
                      <td>W</td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td>22</td>
                      <td>M</td>
                    </tr>
                  </tbody>
                </table>
              </p>
              <button onClick={handleCloseUserDataFormat} className="button">Schließen</button>
            </Box>
          </Modal>
          {/*<button className="button">
            Upload demographic data
          </button>*/}
        </div>
        {/* Choose Usability Data*/}
        <div className="buttonColumn">
          {/* Upload Usability Data*/}
          <div className="fieldDataFile">
            <p>Hier kannst du deine Daten hochladen. Wähle zuerst den Usability-Fragebogen aus, welchen du gerne analysieren möchtest. Anschließend kannst du deine dazugehörige csv-Datei hochladen. Für Infos bzgl. des Aufbaus der Datei, öffne gerne die Infos oben.</p>
            <select id="questionnaire-type" name="questionnaire-type">
              <option value="">-- Bitte wählen --</option>
              <option value="type1">User Experience Questionnaire (UEQ)</option>
              <option value="type2">System Usability Scale (SUS)</option>
              <option value="type3">Net Promoter Score (NPS)</option>
              <option value="type3">RAW Task Load Index</option>
            </select>
            <br />
            {/* Datei-Upload-Button*/} 
           <input type="file" accept={".csv"} onChange={fileUploader} />
            <br />
            <br />
            <Link to="/workspace">
          <button className="button">
            Start to Analyse
          </button >
          </Link>
          </div>
          <div className="separator"></div>
          <div className="fieldDataFile">
            {/* Upload Usability Data*/}
            <p>Hier kannst du deine Daten maskieren. Wähle zuerst den Usabiliyt-Fragebogen aus, welchen du gerne analysieren möchtest. Für Infos zum Datenformat klicke, HIER!</p>
            <select id="questionnaire-type" name="questionnaire-type">
              <option value="">-- Bitte wählen --</option>
              <option value="type1">User Experience Questionnaire (UEQ)</option>
              <option value="type2">System Usability Scale (SUS)</option>
              <option value="type3">Net Promoter Score (NPS)</option>
              <option value="type3">RAW Task Load Index</option>
            </select>
            <br />
            <br />
            <Link to="/workspace">
          <button className="button">
            Start to Analyse
          </button >
          </Link>
          </div>
        </div>
      </div>
      {/* use Link for redirecting */}
      <div className="analyse-section">
      <button className="button" onClick={() => window.location.reload()}>
        Refresh
      </button>
      </div>
      <p className="read-the-docs">
        Impressum!!!!!!!!!!!!!!!!!!!!!
      </p>


      {/*<p><button onClick={() => setCount((count) => count + 1)}>
          Upload User-Data {count}
        </button>
        
          Edit <code>src/app/pages/home/Home.jsx</code> and save to test HMR
        </p>*/}


    </>
  )
}

export default Home
