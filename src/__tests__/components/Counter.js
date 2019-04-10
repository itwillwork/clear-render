import React, { useState } from 'react';

export default function Counter(props) {
  const [count, setCount] = useState(0);

  const { title, description } = props;

  return (
    <div>
      <button onClick={() => setCount(count + 1)} data-testid="button">
        {count}
      </button>
      <span data-testid="props-title">{title}</span>
      <span>{description}</span>
    </div>
  );
}
