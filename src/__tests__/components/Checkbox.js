import React from 'react';

class Checkbox extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isChecked: false };

    this.onChange = this.onChange.bind(this);
  }

  onChange() {
    this.setState({ isChecked: !this.state.isChecked });
  }

  render() {
    const { title, description } = this.props;

    return (
      <div>
        <input
          type="checkbox"
          data-testid="checkbox"
          checked={this.state.isChecked}
          onChange={this.onChange}
        />
        <label data-testid="state-isChecked">
          {this.state.isChecked ? '1' : '0'}
        </label>
        <span data-testid="props-title">{title}</span>
        <span>{description}</span>
      </div>
    );
  }
}

export default Checkbox;
