 
import { scalePoint, scaleLinear, scaleTime } from 'd3-scale';
import { filter, find, first, last, map as _map, sortBy, uniq } from 'lodash-es';
import fecha from 'fecha';

import { detectType, notEmpty } from './util';

class Diminsion {
  constructor(type, parse, map, scale) {
    this._type = type;
    this._parse = parse;
    this._map = map;
    this._scale = scale;

    this.map = this.map.bind(this);
    this.parse = this.parse.bind(this);
    this.scale = this.scale.bind(this);
  }

  min() {
    return this._scale.domain()[0];
  }

  max() {
    return this._scale.domain()[1];
  }

  parse(d) {
    return this._parse(this.map(d));
  }

  overrideMap(map) {
    if (map) return new Diminsion(this._type, this._parse, map, this._scale);
    else
      return this;
  }

  map(d) {
    if (this._map)
      return this._map(d);
    else
      return null;
  }

  scale(d) {
    if (d)
      return this._scale(this.parse(d));
    else
      return this._scale;
  }

  ticks(n, format) {
    const ticks = this.scale().ticks(n);
    const tickFormat = this.scale().tickFormat(n, format);
    return ticks.map(tick => ({
      scaled: this._scale(tick),
      value: tickFormat(tick)
    }));
  }

  type() {
    return this._type;
  }
}

export function parseDimension(spec, data, map, defaults) {

  if (typeof spec === 'string') spec = { };
  spec = Object.assign({}, defaults, spec);

  let values = spec.values;
  if (!values) {
    values = _map(data || [], map);
    values = filter(values, v => v !== null && v !== undefined);
    values = sortBy(values);
  }

  if (!spec.type) spec.type = detectType(values);

  const min = find([spec.min, first(values)], notEmpty);
  const max = find([spec.max, last(values)], notEmpty);

  let parse = v => v;
  let scale;
  if (spec.type === 'datetime') {

    parse = v => fecha.parse(v);
    scale = scaleTime()
      .domain([parse(min), parse(max)]);

  } else if (spec.type === 'number') {

    scale = scaleLinear()
      .domain([min, max]);

  } else {

    scale = scalePoint()
      .domain(values);
  }

  return new Diminsion(spec.type, parse, map, scale);
}

export default parseDimension;
