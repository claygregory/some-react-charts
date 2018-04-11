
import React from 'react';
import { ScatterChart } from '../';

/*--- START SNIPPET--- */
const data = Array(20).fill().map(
  () => ({ x: Math.random() * 10, y: Math.random() * 10 })
);

const ScatterPlotExample = () => (

  <ScatterChart data={data} fill="#DB484D" stroke="white" strokeWidth="2" r="6" x="x" y="y"/>

);
/*--- END SNIPPET--- */

export default ScatterPlotExample;