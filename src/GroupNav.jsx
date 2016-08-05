import React from 'react';
import ListFold from './ListFold';

function reducer(pv, cv) {
  if (cv.time >= pv.time) {
    return cv;
  }

  return pv;
}

function selector(o) {
  return `Last updated: ${o.added}`;
}

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
              <ul>
                <li>
                  <h2>
                    <a onClick={this.props.application.onGroupClick.bind({}, g)}>{g.group}</a>
                  </h2>
                </li>
                <li><ListFold
                  list={g.collections}
                  initial={{time: 0}}
                  fold={reducer}
                  select={selector}
                /></li>
              </ul>
            </li>
          })}
        </ul>
      </nav>
    </div>;
  }
}

export default GroupNav;
