
import { every, filter, map as _map, uniq } from 'lodash-es';
import fecha from 'fecha';

export function detectType(arr) {
  if (!arr || arr.length === 0)
    return 'string';

  const types = uniq(arr.map(v => (typeof v)));
  if (types.length > 1)
    return 'string';

  let type = types[0];
  if (type === 'number')
    return type;

  if (every(arr.map(v => typeof v === 'string' && fecha.parse(v))))
    return 'datetime';
  else
    return 'string';
}

export function filterData(data, ...specs) {
  return filter(data, d =>
    every(specs.map(s => s.map(d)), v => v !== null && v !== undefined)
  );
}

export function empty(v) {
  return v === null || v === undefined;
}

export function notEmpty(v) {
  return !empty(v);
}

export function propertyMap(prop) {
  if (typeof prop === 'object') {
    return v => _map([v], prop.value)[0];
  } else if (typeof prop === 'string') {
    return v => _map([v], prop)[0];
  } else {
    return null;
  }
}

export function scaleData(data, ...specs) {
  const filteredData = filterData(data, ...specs);
  return filteredData.map(d => specs.map(s => s.scale(d)));
}