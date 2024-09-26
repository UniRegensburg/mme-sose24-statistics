
/**
 * A component containing diagrams from a workspace.
 * 
 * @returns {ReactNode} Rendered component.
 */

export default function Visualization() {
  const chartRef = useRef(null);

  useEffect(() => {
    const chart = Plot.plot({
      marks: [
        Plot.barY(data, { x: "name", y: "value" }), 
      ],
      x: {
        label: "Pages",
      },
      y: {
        label: "Values", 
      },
    });

    if (chartRef.current) {
      chartRef.current.appendChild(chart); 
    }

    return () => {
      if (chartRef.current) {
        chartRef.current.innerHTML = '';
      }
    };
  }, []);

  return (
    <div>
      <h3>Bar Chart Visualization</h3>
      <div ref={chartRef}></div> {}
    </div>
  );
}
