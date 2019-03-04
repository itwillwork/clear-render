import React, { useState } from 'react';

export default function Counter(props) {
  const [count, setCount] = useState(0);

  const { label } = props;

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>{count}</button>
      <label>{label}</label>
    </div>
  );
}
