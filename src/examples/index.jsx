
import React from 'react';
import { render } from 'react-dom';

import SimpleAreaChartExample from './simple-area-chart';
import SimpleAreaChartExampleSource from '!raw-loader!./simple-area-chart';

import SimpleBarChartExample from './simple-bar-chart';
import SimpleBarChartExampleSource from '!raw-loader!./simple-bar-chart';

import SimpleLineChartExample from './simple-line-chart';
import SimpleLineChartExampleSource from '!raw-loader!./simple-line-chart';

import ScatterPlotExample from './scatter-plot';
import ScatterPlotExampleSource from '!raw-loader!./scatter-plot';

import Snippet from './snippet';

const Example = ({ title, children, source }) => (

  <section className="example">
    <h2>{title}</h2>
    <div className="rendered">
      {children}
    </div>
    <div className="source">
      <Snippet source={source}/>
    </div>
  </section>
);

const Examples = () => {

  return (
    <main>
      <h1>Some React Charts</h1>
      <p>
        An Introduction
      </p>

      <Example title="Area Chart" source={SimpleAreaChartExampleSource}>
        <SimpleAreaChartExample />
      </Example>

      <Example title="Bar Chart" source={SimpleBarChartExampleSource}>
        <SimpleBarChartExample />
      </Example>

      <Example title="Line Chart" source={SimpleLineChartExampleSource}>
        <SimpleLineChartExample />
      </Example>

      <Example title="Scatter Plot" source={ScatterPlotExampleSource}>
        <ScatterPlotExample />
      </Example>
    </main>
  );
};

render(
  <Examples/>, document.getElementById('examples')
);
