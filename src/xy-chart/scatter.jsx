
import React from 'react';

import XYChart from './xy-chart';
import { constantOrCall, propertyMap, scaleData } from '../util';


const Scatter = ({ data, chartX, chartY, fill, stroke, strokeWidth, r = 3, y }) => {

  const x = chartX;
  y = chartY.overrideMap(propertyMap(y));

  const scaled = scaleData(data, x, y);

  if (stroke)
    strokeWidth = strokeWidth || 3;

  return (
    <React.Fragment>
      {scaled.map(([x, y, d], i) => (
        <circle key={i}
          className="dot"
          fill={constantOrCall(fill, d, i)}
          r={constantOrCall(r, d, i)}
          stroke={constantOrCall(stroke, d, i)}
          strokeWidth={constantOrCall(strokeWidth, d, i)}
          cx={x}
          cy={y} />
      ))}
    </React.Fragment>
  );
};

Scatter.defaultProps = {
  chartRole: 'chart'
};


const ScatterChart = ({ fill, stroke, strokeWidth, r = 3, ...props }) => {
  return (
    <XYChart margin={[r, r, r, r]} {...props}>
      <Scatter {...{ fill, stroke, strokeWidth, r }}/>
    </XYChart>
  );
};

export {
  ScatterChart,
  Scatter
};