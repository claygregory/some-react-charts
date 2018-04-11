
import React from 'react';
import { AreaChart } from '../';

/*--- START SNIPPET--- */
const data = [
  { idx: 1, value: 1 },
  { idx: 2, value: 5 },
  { idx: 3, value: 2 },
  { idx: 4, value: 8 },
  { idx: 5, value: 6 },
  { idx: 6, value: 9 }
];

const SimpleAreaChartExample = () => (

  <AreaChart data={data} stroke="#282D51" fill="#B7BDE8" smooth 
    x="idx" y="value" />

);
/*--- END SNIPPET--- */

export default SimpleAreaChartExample;