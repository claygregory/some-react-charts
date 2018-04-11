
import React from 'react';
import autobind from 'react-autobind';
import Measure from 'react-measure';

import { propertyMap } from '../util';
import { parseDimension } from '../dimension';

class XYChart extends React.Component {

  constructor(props) {
    super(props);
    autobind(this);

    this.state = {
      height: 0,
      width: 0
    };
  }

  _height() {
    return this.props.height || Math.round(this._width() * 1 / (this.props.aspect || 3));
  }

  _width() {
    return Math.round(this.state.width || 0);
  }

  _chartHeight() {
    const margins =  this._chartYOffset() + this._margin()[2];
    return this._height() - margins;
  }

  _chartXOffset() {
    return this._margin()[3];
  }

  _chartYOffset() {
    return this._margin()[0];
  }

  _chartWidth() {
    const margins =  this._margin()[1];
    return this._width() - this._chartXOffset() - margins;
  }

  _margin() {
    if (this.props.margin instanceof Array && this.props.margin.length === 4)
      return this.props.margin.map(m => parseInt(m));
    else if (typeof this.props.margin === 'string') {
      const divided = this.props.margin.split(',');
      if (divided.length === 4)
        return divided.map(m => parseInt(m));
      else
        return [0, 0, 0, 0].map(() => parseInt(this.props.margin));
    }
    else
      return [8, 8, 8, 8];
  }

  _x() {
    const xMap = propertyMap(this.props.x);
    return parseDimension(this.props.x, this.props.data, xMap);
  }

  _y() {
    const yMap = propertyMap(this.props.y);
    return parseDimension(this.props.y, this.props.data, yMap, {
      min: this.props.relative ? null : 0
    });
  }

  renderChart() {

    const data = this.props.data;
    const height = this._chartHeight();
    const offset = [this._chartXOffset(), this._chartYOffset()];
    const width = this._chartWidth();

    const children = React.Children.map(this.props.children, child => {
      const chartX = this._x();
      const chartY = this._y();

      chartX.scale().range([0, width]);
      chartY.scale().range([height, 0]);

      return (
        <g transform={`translate(${offset[0]},${offset[1]})`}>
          {React.cloneElement(child, { data, chartX, chartY, height, width })}
        </g>
      );
    });

    return (
      <svg width="100%" height={this._height()}>
        {children}
      </svg>
    );
  }

  render() {
    const width = this._width();
    const classes = ['chart'];
    if (this.props.light)
      classes.push('light');
    if (this.props.dark)
      classes.push('dark');
    if (this.props.transparent)
      classes.push('transparent');

    (this.props.className || '').split(' ').forEach(c => classes.push(c));

    return (
      <Measure
        bounds
        onResize={(contentRect) => {
          this.setState(contentRect.bounds);
        }}
      >
        {({ measureRef }) => (
          <div ref={measureRef} className={classes.join(' ')}>
            {!!width && this.renderChart()}
          </div>
        )}
      </Measure>
    );
  }
}

export default XYChart;
export { XYChart };