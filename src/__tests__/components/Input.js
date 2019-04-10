import React from 'react';

class Input extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { value, onChange, title, description } = this.props;

    return (
      <div>
        <input
          type="text"
          data-testid="text"
          value={value}
          onChange={onChange}
        />
        <span data-testid="props-title">{title}</span>
        <span>{description}</span>
      </div>
    );
  }
}

export default Input;