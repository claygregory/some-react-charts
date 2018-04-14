
import React from 'react';
import { BarChart } from '../';

/* ---START SNIPPET--- */
const data = [
  { idx: 1, value: 2 },
  { idx: 2, value: 8 },
  { idx: 3, value: 3 },
  { idx: 4, value: 5 },
  { idx: 5, value: 1 },
  { idx: 6, value: 9 },
  { idx: 7, value: 4 },
  { idx: 8, value: 6 },
  { idx: 9, value: 7 },
  { idx: 10, value: 3 },
  { idx: 11, value: 8 },
  { idx: 12, value: 6 },
  { idx: 13, value: 1 },
  { idx: 14, value: 4 },
  { idx: 15, value: 5 }
];

const SimpleBarChartExample = () => (

  <BarChart data={data} barWidth="8" fill="#B7BDE8" x="idx" y="value"/>

);
/* ---END SNIPPET--- */

export default SimpleBarChartExample;