
import React from 'react';

import XYChart from './xy-chart';
import XAxis from './x-axis';
import YAxis from './y-axis';
import { constantOrCall, propertyMap, scaleData } from '../util';


const Bars = ({ data, chartX, chartY, barWidth = 4, fill, stroke, strokeWidth, y, y0, y1 }) => {

  const x = chartX;
  if (y0)
    y0 = chartY.overrideMap(propertyMap(y0));
  else
    y0 = chartY.overrideMap(() => chartY.min());
  
  if (y1 || y) 
    y1 = chartY.overrideMap(propertyMap(y1 || y));
  else
    y1 = chartY;

  if (stroke)
    strokeWidth = strokeWidth || 2;

  const scaled = scaleData(data, x, y0, y1);

  const xData = scaled.map(d => d[0]);
  const dataWidth = Math.max(...xData) - Math.min(...xData);
  barWidth = Math.min(Math.floor(dataWidth / scaled.length) - 1, barWidth);
  barWidth = Math.max(barWidth, 1);

  return (
    <React.Fragment>
      {scaled.map(([x, y0, y1, d], i) => (
        <rect key={x.toString()}
          className="bar"
          ry={Math.floor(barWidth / 2) + 'px'}
          x={x - barWidth / 2}
          y={y1}
          fill={constantOrCall(fill, d, i)}
          stroke={constantOrCall(stroke, d, i)}
          strokeWidth={constantOrCall(strokeWidth, d, i)}
          width={barWidth} 
          height={(y0 - y1)} />
      ))}
    </React.Fragment>
  );
};

Bars.defaultProps = {
  chartRole: 'chart'
};


const BarChart = ({ barWidth = 4, fill, stroke, strokeWidth, y0, y1, ...props }) => {
  return (
    <XYChart margin={[0, barWidth, 0, barWidth]} {...props}>
      <Bars {...{ barWidth, fill, stroke, strokeWidth, y0, y1 }}/>
    </XYChart>
  );
};

export {
  Bars,
  BarChart
};