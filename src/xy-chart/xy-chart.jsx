
import React from 'react';
import autobind from 'react-autobind';
import Measure from 'react-measure';
import { first } from 'lodash-es';

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
    const margins =  this._margin()[0] + this._margin()[2];
    return this._height() - margins;
  }

  _chartWidth() {
    const margins =  this._margin()[3] + this._margin()[1];
    return this._width() - margins;
  }

  _childrenByRole(role) {

    const data = this.props.data;
    const height = this._chartHeight();
    const margin = this._margin();
    const width = this._chartWidth();

    const children = (React.Children.toArray(this.props.children) || [])
      .filter(c => c.props.chartRole === role);

    return React.Children.map(children, child => {
      const chartX = this._x();
      const chartY = this._y();

      chartX.scale().range([0, width]);
      chartY.scale().range([height, 0]);

      return React.cloneElement(child, { data, chartX, chartY, height, margin, width });
    });
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
      return [0, 0, 0, 0];
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

  renderXAxis() {

    return React.Children.map(this._childrenByRole('xAxis'), axis => {

      const position = axis.props.position || 'bottom';
      const style = {
        gridArea: `${position}-axis`,
        marginLeft: axis.props.margin[3],
        marginRight: axis.props.margin[1]
      };
    
      return (
        <div style={style} className="axis x-axis">
          {axis}
        </div>
      );
    });
  }

  renderYAxis() {

    return React.Children.map(this._childrenByRole('yAxis'), axis => {

      const position = axis.props.position || 'left';
      const style = {
        gridArea: `${position}-axis`,
        marginTop: axis.props.margin[0],
        marginBottom: axis.props.margin[2]
      };
    
      return (
        <div style={style} className="axis y-axis">
          {axis}
        </div>
      );
    });
  }

  renderSvg() {

    const chartElements = React.Children.map(this._childrenByRole('chart'), chartElement => {
      return (
        <g transform={`translate(${chartElement.props.margin[3]},${chartElement.props.margin[0]})`}>
          {chartElement}
        </g>
      );
    });

    return (
      <svg width="100%" height={this._height()}>
        {chartElements}
      </svg>
    );
  }

  render() {
    const height = this._height();
    const width = this._width();
    const classes = ['chart', 'xy-chart'];

    (this.props.className || '').split(' ')
      .filter(c => !!c)
      .forEach(c => classes.push(c));

    const style = {
      display: 'grid',
      gridTemplateColumns: 'auto 1fr auto',
      gridTemplateRows: '1fr auto',
      gridTemplateAreas: `'. top-axis .'
      'left-axis chart right-axis'
      '. bottom-axis .'`
    };

    return (
      <Measure bounds onResize={contentRect => this.setState(contentRect.bounds)}>
        {({ measureRef }) => (
          <div style={style} className={classes.join(' ')}>
            <div className="graphic" ref={measureRef} style={{ gridArea: 'chart' }}>
              {(!!width && !!height) && this.renderSvg()}
            </div>
            {!!width && this.renderXAxis()}
            {!!height && this.renderYAxis()}
          </div>
        )}
      </Measure>
    );
  }
}

export default XYChart;
export { XYChart };