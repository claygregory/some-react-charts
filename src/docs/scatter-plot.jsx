
import React from 'react';
import { ScatterChart } from '../';

/* ---START SNIPPET--- */
const colors = ['blue', 'green'];

const data = Array(20).fill().map((_, i) =>
  ({ x: Math.random() * 10, y: Math.random() * 10, color: colors[i%2] })
);

const ScatterPlotExample = () => (

  <ScatterChart data={data} fill={(d) => d.color} stroke="white"
    strokeWidth="2" r="5" x="x" y="y"/>

);
/* ---END SNIPPET--- */

export default ScatterPlotExample;