import { Box, Modal } from "@mui/material";
import QUESTIONNAIRE_TYPE from "../../constants/QuestionnaireType";

export default function FormatGuide({ open, onClose }) {

  return (
  <Modal open={open} onClose={onClose}>
    <Box className="modal-box">
      <h2>Datenformat</h2>
      <p>
        Zugelassen sind nur CSV-Dateien. Diese müssen für die Analyse im folgenden Format vorliegen.
        Spalte 1-3 enthalten die demografischen Informationen, die folgenden Spalten enthalten die Antworten der Fragebögen.
        Beispielhaft ist hier der SUS gelistet. Andere Fragebögen sind analog zu beachten, nur mit angepasster Fragenanzahl.
      </p>
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
      <p>Die Anforderungen an das Fragebogenformat sind unten aufgeführt:</p>
      <table className="exampleTable">
        <tbody>
          <tr>
            <th>Typ</th>
            <th>Anzahl der Fragen</th>
            <th>Wertebereich</th>
          </tr>
          {Object.keys(QUESTIONNAIRE_TYPE).slice(1).map(key => {
            const type = QUESTIONNAIRE_TYPE[key]
            return (
              <tr>
                <td>{type.name}</td>
                <td>{type.numOfQuestions}</td>
                <td>{`${type.minValue} - ${type.maxValue}`}</td>
              </tr>
            )})
          }
        </tbody>
      </table>
      <button onClick={onClose} className="button">Schließen</button>
    </Box>
  </Modal>
  )
}