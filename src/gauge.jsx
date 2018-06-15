
import React from 'react';
import { scaleLinear } from 'd3-scale';
import { arc } from 'd3-shape';
import autobind from 'react-autobind';
import Measure from 'react-measure';

import { degToRad } from './util';

class Gauge extends React.Component {

  constructor(props) {
    super(props);
    autobind(this);

    this.state = {
      height: 0,
      width: 0
    };
  }

  _endAngle() {
    if (this.props.endAngle != null)
      return degToRad(this.props.endAngle);
    else
      return degToRad(120);
  }

  _fill() {
    return this.props.fill || 'black';
  }

  _height() {
    return this.props.height || this._width();
  }

  _max() {
    return parseFloat(this.props.max) || 100.0;
  }

  _min() {
    return parseFloat(this.props.min) || 0.0;
  }

  _max() {
    return parseFloat(this.props.max) || 100.0;
  }

  _shapeFill() {
    return this.props.fill || '#eee';
  }

  _startAngle() {
     if (this.props.startAngle != null)
      return degToRad(this.props.startAngle);
    else
      return degToRad(-120);
  }

  _barWidth() {
    return parseFloat(this.props.barWidth) || 10;
  }

  _value() {
    return parseFloat(this.props.value) || 0.0;
  }

  _width() {
    return Math.round(this.state.width || 0);
  }

  renderContent() {

    if (!this.props.children)
      return null;

    const style = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)'
    }

    return (
      <div style={style} className="arc-content">
        {this.props.children}
      </div>
    );
  }

  renderSvg() {

    const height = this._height();
    const width = this._width();
    const value = this._value();

    const scale = scaleLinear()
      .domain([this._min(), this._max()])
      .range([this._startAngle(), this._endAngle()]);

    const bgArc = arc()
      .cornerRadius(this._barWidth() / 2)
      .innerRadius(width / 2 - this._barWidth())
      .outerRadius(width / 2)
      .startAngle(this._startAngle())
      .endAngle(this._endAngle());

    const fgArc = arc()
      .cornerRadius(this._barWidth() / 2)
      .innerRadius(width / 2 - this._barWidth())
      .outerRadius(width / 2)
      .startAngle(this._startAngle())
      .endAngle(scale(value));

    return (
      <svg width={this._width()} height={this._height()}>
        <g transform={`translate(${this._width() / 2},${this._height() / 2})`}>
          <path
            fill={this._shapeFill()}
            className="arc-shape"
            d={bgArc()}/>

          <path
            fill={this._fill()}
            className="arc-fill"
            d={fgArc()}/>
        </g>
      </svg>
    );
  }

  render() {
    const height = this._height();
    const width = this._width();
    const classes = ['chart', 'gauge'];

    (this.props.className || '').split(' ')
      .filter(c => !!c)
      .forEach(c => classes.push(c));

    const style = {
      position: 'relative'
    };

    return (
      <Measure bounds onResize={contentRect => this.setState(contentRect.bounds)}>
        {({ measureRef }) => (
          <div ref={measureRef} className={classes.join(' ')} style={style}>
            {(!!width && !!height) && this.renderSvg()}
            {(!!width && !!height) && this.renderContent()}
          </div>
        )}
      </Measure>
    );
  }

}

export default Gauge;
export { Gauge };