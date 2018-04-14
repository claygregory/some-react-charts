
import React from 'react';

import { constantOrCall, propertyMap, scaleData } from '../util';


const YAxis = ({ data, chartY, position = 'left' }) => {

  const y = chartY;

  return (
    <React.Fragment>
      Axis Y!
    </React.Fragment>
  );
};

YAxis.defaultProps = {
  chartRole: 'yAxis'
};

export default YAxis;
export { YAxis };