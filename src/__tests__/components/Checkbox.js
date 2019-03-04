import React from 'react';

export default class Checkbox extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isChecked: false };

    this.onChange = this.onChange.bind(this);
  }

  onChange() {
    this.setState({ isChecked: !this.state.isChecked });
  }

  render() {
    const { label } = this.props;

    return (
      <div>
        <input
          type="checkbox"
          checked={this.state.isChecked}
          onChange={this.onChange}
        />
        <label>{this.state.isChecked ? 'On' : 'Off'}</label>
        <span>{label}</span>
      </div>
    );
  }
}
