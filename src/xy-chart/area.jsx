
import React from 'react';
import { area, curveCardinal, line } from 'd3-shape';
import { sortBy } from 'lodash-es';

import XYChart from './xy-chart';
import { constantOrCall, propertyMap, scaleData } from '../util';


const Area = ({ data, chartX, chartY, fill, stroke, strokeWidth = 3, smooth, y0, y1 }) => {

  let hasStroke0 = !!stroke && !!y0;
  let hasStroke1 = !!stroke;

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

  const toAreaPath = area()
    .x(d => d[0])
    .y0(d => d[1])
    .y1(d => d[2]);

  const toStrokePath0 = line()
    .x(d => d[0])
    .y(d => d[1]);

  const toStrokePath1 = line()
    .x(d => d[0])
    .y(d => d[2]);

  if (smooth) {
    toAreaPath.curve(curveCardinal);
    toStrokePath0.curve(curveCardinal);
    toStrokePath1.curve(curveCardinal);
  }

  const strokePath = (toPath) => (
    <path className="line"
      fill="none"
      stroke={constantOrCall(stroke)}
      strokeWidth={constantOrCall(strokeWidth)}
      d={toPath(scaled)}
      strokeLinecap="round" />
  );

  return (
    <React.Fragment>
      <path className="area"
        fill={constantOrCall(fill)}
        d={toAreaPath(scaled)} />

      {hasStroke0 && strokePath(toStrokePath0)}
      {hasStroke1 && strokePath(toStrokePath1)}

    </React.Fragment>
  );
};

Area.defaultProps = {
  chartRole: 'chart'
};


const AreaChart = ({ fill, stroke, strokeWidth, smooth, y0, y1, ...props }) => {
  return (
    <XYChart margin="8,0,8,0" {...props}>
      <Area y={y1} {...{ fill, stroke, strokeWidth, smooth, y0, y1 }}/>
    </XYChart>
  );
};

export {
  Area,
  AreaChart
};