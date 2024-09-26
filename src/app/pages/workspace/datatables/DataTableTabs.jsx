
/**
 * A tabs component containing data tables from a workspace.
 * 
 * @returns {ReactNode} Rendered tabs component.
 */

export default function DataTableTabs() {
  const [activeTab, setActiveTab] = useState(0); 
  const [dataTables, setDataTables] = useState([]); 

  useEffect(() => {
    Promise.all(csvFiles.map(file => d3.csv(file)))
      .then(data => {
        setDataTables(data);
      })
      .catch(error => {
        console.error('Error', error);
      });
  }, []);
  
  return (
<div>
      <div className="tab-bar">
        {dataTables.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            className={activeTab === index ? 'active-tab' : ''}
          >
            Data Table {index + 1} {}
          </button>
        ))}
      </div>

      <div className="data-table">
        {dataTables.length > 0 ? (
          <table>
            <thead>
              <tr>
                {Object.keys(dataTables[activeTab][0]).map((columnName, i) => (
                  <th key={i}>{columnName}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {dataTables[activeTab].map((row, i) => (
                <tr key={i}>
                  {Object.values(row).map((value, j) => (
                    <td key={j}>{value}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  ); 

}