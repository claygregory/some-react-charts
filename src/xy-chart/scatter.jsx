
import React from 'react';

import { XYChart } from './';
import { propertyMap, scaleData } from '../util';


const Scatter = ({ data, chartX, chartY, r = 3, y }) => {

  const x = chartX;
  y = chartY.overrideMap(propertyMap(y));

  const scaled = scaleData(data, x, y);

  return (
    <React.Fragment>
      {scaled.map(([x, y], i) => (
        <circle key={i}
          className="dot"
          r={r}
          cx={y}
          cy={x} />
      ))}
    </React.Fragment>
  );
};

const ScatterChart = ({ r, ...props }) => {
  return (
    <XYChart {...props}>
      <Scatter {...{ r }}/>
    </XYChart>
  );
};

export {
  ScatterChart,
  Scatter
};