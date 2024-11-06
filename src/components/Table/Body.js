import React from "react";
import { connect } from "react-redux";
import Row from "./Row";

import { FixedSizeList as List } from "react-window";
import { addRow } from "../../reducers";

class Body extends React.Component {
  renderRow = ({ index, style }) => {
    const { rows } = this.props;
    const cells = rows[index];
    return (
      <div style={{ ...style, display: "flex", padding: "30px" }} key={index}>
        <Row cells={cells} row={index} isLastRow={index === rows.length - 1} />
      </div>
    );
  };

  render() {
    const { rows } = this.props;
    return (
      <List
        height={500} // Height of the list viewport
        itemCount={rows.length} // Total number of rows
        itemSize={50} // Row height (adjust as needed)
        width="100%"
      >
        {this.renderRow}
      </List>
    );
  }
}

const mapStateToProps = ({ table }) => ({
  rows: table.rows,
});

const mapDispatchToProps = {
  addRow,
};

export default connect(mapStateToProps, mapDispatchToProps)(Body);
