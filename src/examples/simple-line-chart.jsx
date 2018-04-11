
import React from 'react';
import { LineChart } from '../';

/*--- START SNIPPET--- */
const data = [
  { idx: 1, value: 1 },
  { idx: 2, value: 5 },
  { idx: 3, value: 2 },
  { idx: 4, value: 8 },
  { idx: 5, value: 6 },
  { idx: 6, value: 9 }
];

const SimpleLineChartExample = () => (

  <LineChart data={data} smooth stroke="green" x="idx" y="value"/>

);
/*--- END SNIPPET--- */

export default SimpleLineChartExample;