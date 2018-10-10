import * as React from 'react';
import _ from "lodash";
import RGL, { WidthProvider } from "react-grid-layout";

const ReactGridLayout = WidthProvider(RGL);
const originalLayout = getFromLS("layout");

export default class DashboardLayout extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    const layout = originalLayout || this.generateLayout();
    this.state = { layout };
  }

  static defaultProps = {
    className: "layout",
    items: 20,
    rowHeight: 30,
    // onLayoutChange: function() {

    // },
    cols: 12
  };

  generateDOM() {
    return _.map(_.range(this.props.items), function(i) {
      return (
        <div key={i} className="dashboardItem">
          <span className="text">{i}</span>
        </div>
      );
    });
  }

  generateLayout() {
    const p = this.props;
    return _.map(new Array(p.items), function(item, i) {
      const w = Math.ceil(Math.random() * 4);
      const y = Math.ceil(Math.random() * 4) + 1;
      return {
        x: (i * 2) % 12,
        y: Math.floor(i / 6) * y,
        w: w,
        h: y,
        i: i.toString()
      };
    });
  }

  onLayoutChange(layout) {
    saveToLS("layout", layout);
    //this.setState({ layout });
    //this.props.onLayoutChange(layout);
  }

  render() {
    return (
      <ReactGridLayout
        layout={this.state.layout}
        onLayoutChange={this.onLayoutChange}
        {...this.props}
      >
        {this.generateDOM()}
      </ReactGridLayout>
    );
  }
}

function getFromLS(key) {
  let ls = {};
  if (localStorage) {
    try {
      ls = JSON.parse(localStorage.getItem("dashboardData")) || {};
    } catch (e) {
      /*Ignore*/
    }
  }
  return ls[key];
}

function saveToLS(key, value) {
  if (localStorage) {
    localStorage.setItem(
      "dashboardData",
      JSON.stringify({
        [key]: value
      })
    );
  }
}

// module.exports = MessyLayout;

// if (require.main === module) {
//   require("../test-hook.jsx")(module.exports);
// }
