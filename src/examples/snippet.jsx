
import React from 'react';
import Highlight from 'react-highlight';

const START_TAG = '/* ---START SNIPPET--- */';
const END_TAG = '/* ---END SNIPPET--- */';

const Snippet = ({ source }) => {

  const start = source.indexOf(START_TAG) + START_TAG.length + 1;
  const end = source.indexOf(END_TAG);

  return (
    <Highlight className="javascript">{source.slice(start, end)}</Highlight>
  );

};

export default Snippet;