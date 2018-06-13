
import React from 'react';

const YAxis = ({ data, chartY, chartHeight, count = 3, format, margin, width = 80, position = 'left' }) => {

  const y = chartY;
  const ticks = y.ticks(count, format);

  const height = chartHeight + margin[0] + margin[2];

  const anchor = position === 'left' ? 'end' : 'start';

  return (
    <svg width={width} height={height}>
      {ticks.map((tick, i) => (
        <text key={i} x={width} y={tick.scaled + margin[0]} textAnchor={anchor} className="label">
          {tick.value}
        </text>
      ))}
    </svg>
  );
};

YAxis.defaultProps = {
  chartRole: 'yAxis'
};

export default YAxis;
export { YAxis };