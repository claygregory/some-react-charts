
import React from 'react';
import { curveCardinal, line } from 'd3-shape';
import { sortBy } from 'lodash-es';

import XYChart from './xy-chart';
import { constantOrCall, propertyMap, scaleData } from '../util';


const Line = ({ data, chartX, chartY, smooth, stroke = 'black', strokeWidth, y }) => {

  const x = chartX;
  y = chartY.overrideMap(propertyMap(y));
  data = sortBy(data, x.map);
  const scaled = scaleData(data, x, y);

  const toPath = line()
    .x(d => d[0])
    .y(d => d[1]);

  if (smooth)
    toPath.curve(curveCardinal);

  return (
    <React.Fragment>
      <path
        fill="none"
        className="line"
        d={toPath(scaled)}
        stroke={constantOrCall(stroke)}
        strokeWidth={constantOrCall(strokeWidth)}
        strokeLinecap="round" />
    </React.Fragment>
  );
};

const LineChart = ({ stroke, smooth, strokeWidth, ...props }) => {
  return (
    <XYChart margin="8,0,8,0" {...props}>
      <Line {...{ stroke, smooth, strokeWidth }}/>
    </XYChart>
  );
};

export {
  Line,
  LineChart
};