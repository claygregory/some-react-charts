
import React from 'react';

const XAxis = ({ data, chartX, chartWidth, count, format, margin, height = 12, position = 'bottom' }) => {

  const x = chartX;
  const ticks = x.ticks(count, format);

  return (
    <svg width="100%" height={height}>
      {ticks.map((tick, i) => (
        <text key={i} x={tick.scaled + margin[3]} y={height} textAnchor="middle" className="label">
          {tick.value}
        </text>
      ))}
    </svg>
  );
};


XAxis.defaultProps = {
  chartRole: 'xAxis'
};

export default XAxis;
export { XAxis };