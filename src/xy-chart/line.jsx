
import React from 'react';
import { curveCardinal, line } from 'd3-shape';
import { sortBy } from 'lodash-es';

import { XYChart } from './';
import { propertyMap, scaleData } from '../util';


const Line = ({ data, chartX, chartY, smooth, strokeWidth = 3, y }) => {

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
      <path strokeWidth={strokeWidth} fill="none" className="line" d={toPath(scaled)} strokeLinecap="round" />
    </React.Fragment>
  );
};

const LineChart = ({ smooth, strokeWidth, ...props }) => {
  return (
    <XYChart margin="8,0,8,0" {...props}>
      <Line {...{ smooth, strokeWidth }}/>
    </XYChart>
  );
};

export {
  Line,
  LineChart
};