import React from 'react';

class Breadcrumbs extends React.Component {
    componentDidMount() {
      require('sass/breadcrumbs.scss');
    }

  render() {
    return <ul className="breadcrumbs">
      {this.props.crumbs.map((c, i) => {
        return <li key={`${i}-${c}`}>
          <a onClick={this.props.onCrumbClick.bind({}, c)}>{c}</a>
        </li>;
      })}
    </ul>;
  }
}

export default Breadcrumbs;
