import React from 'react';

class ListFold extends React.Component {
  render() {
    let inner = ' ';

    if (Array.isArray(this.props.list)) {
      inner = this.props.select(this.props.list.reduce(this.props.fold, this.props.initial));
    }

    return <span className="list-fold">{inner}</span>;
  }
}

export default ListFold;
