
import React from 'react';
import { BarChart } from '../';

const data = [
  { x: 1, y: 2 },
  { x: 2, y: 8 },
  { x: 3, y: 3 },
  { x: 4, y: 5 },
  { x: 5, y: 1 },
  { x: 6, y: 9 },
  { x: 7, y: 10 }
];

const BarChartExample = () => (

  <BarChart data={data} x="x" y="y"/>

);

export default BarChartExample;