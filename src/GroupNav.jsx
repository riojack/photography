import React from 'react';

class GroupNav extends React.Component {
  componentDidMount() {
    require('../sass/group-nav.scss');
  }

  render() {
    return <div className="group-navigator">
      <nav>
        <ul>
          {this.props.groups.map((g, i) => {
            return <li key={`${i}-${g.group}`}>
              <h2><a onClick={this.props.application.onGroupClick.bind({}, g)}>{g.group}</a></h2>
            </li>
          })}
        </ul>
      </nav>
    </div>;
  }
}

export default GroupNav;
