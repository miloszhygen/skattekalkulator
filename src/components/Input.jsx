// Import dependencies
import React from 'react';

const Input = (props) => (
  <label>
    {(props.title) && props.title} <br/>
    <input {...props} />
    {(props.titleright) && props.titleright}
    {(props.text) &&
    <div>
      <small>{props.text}</small>
      <br/>
    </div>
    }
  </label>
);

export default Input;