
import React from 'react';
import SyntaxHighlighter, { registerLanguage } from 'react-syntax-highlighter/prism-light';
import jsx from 'react-syntax-highlighter/languages/prism/jsx';
import style from 'react-syntax-highlighter/styles/prism/atom-dark';


const START_TAG = '/* ---START SNIPPET--- */';
const END_TAG = '/* ---END SNIPPET--- */';

const Snippet = ({ source }) => {

  const start = source.indexOf(START_TAG) + START_TAG.length + 1;
  const end = source.indexOf(END_TAG);

  registerLanguage('jsx', jsx);

  return (
    <SyntaxHighlighter useInlineStyles language="jsx" style={style}>{source.slice(start, end)}</SyntaxHighlighter>
  );

};

export default Snippet;