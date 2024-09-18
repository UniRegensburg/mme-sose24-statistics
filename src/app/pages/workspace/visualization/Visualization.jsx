
/**
 * A component containing diagrams from a workspace.
 * 
 * @returns {ReactNode} Rendered component.
 */

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'sampleA', v1: 4000, v2: 2000, v3: 1000 },
  { name: 'sampleB', v1: 3000, v2: 1000, v3: 2000 },
  { name: 'sampleC', v1: 2000, v2: 7000, v3: 2090 },
];

export default function Visualization() {
  return (
<ResponsiveContainer width="100%" height={400}>
      <BarChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="v2" fill="#8884d8" />
        <Bar dataKey="v1" fill="#82ca9d" />
      </BarChart>
    </ResponsiveContainer>

  )
}
