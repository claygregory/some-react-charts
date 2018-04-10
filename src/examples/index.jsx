
import React from 'react';
import { render } from 'react-dom';

import BarChartExample from './bar-chart';

const Examples = () => {

  return (
    <div className="app-container">
      <h1>Hello World!</h1>

      <BarChartExample />
    </div>
  );
};

render(
  <Examples/>, document.getElementById('examples')
);
