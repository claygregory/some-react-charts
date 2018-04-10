
import React from 'react';
import { area, curveCardinal } from 'd3-shape';
import { sortBy } from 'lodash-es';

import { XYChart } from './';
import { propertyMap, scaleData } from '../util';


const Area = ({ data, chartX, chartY, smooth, y0, y1 }) => {

  const x = chartX;
  if (y0)
    y0 = chartY.overrideMap(propertyMap(y0));
  else
    y0 = chartY.overrideMap(() => chartY.min());
  
  if (y1) 
    y1 = chartY.overrideMap(propertyMap(y1));
  else
    y1 = chartY;

  data = sortBy(data, x.map);
  const scaled = scaleData(data, x, y0, y1);

  const toPath = area()
    .x(d => d[0])
    .y0(d => d[1])
    .y1(d => d[2]);

  if (smooth)
    toPath.curve(curveCardinal);

  return (
    <React.Fragment>
      <path className="area" d={toPath(scaled)} />
    </React.Fragment>
  );
};

const AreaChart = ({ smooth, y0, y1, ...props }) => {
  return (
    <XYChart {...props}>
      <Area y={y1} {...{ smooth, y0, y1 }}/>
    </XYChart>
  );
};

export {
  Area,
  AreaChart
};