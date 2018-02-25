import React from 'react';

export default (renderInput) => ({ input, meta, label }) => (
  <div>
    <label>{label}</label>
    {renderInput(input)}
    {meta.error &&
      meta.touched && (
        <span style={{ color: 'red', fontWeight: 'bold' }}> {meta.error} </span>
      )}
  </div>
);
