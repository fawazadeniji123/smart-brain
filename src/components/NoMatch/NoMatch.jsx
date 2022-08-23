import React from 'react';

const NoMatch = () => {
  return (
    <section className='tc mt6 f2'>
      <span
        className='f1'
        style={{
          fontFamily: 'monospace',
          fontWeight: 'bold'
        }}
      >
        404
      </span>
      ...Page Not Found
    </section>
  )
}

export default NoMatch;
