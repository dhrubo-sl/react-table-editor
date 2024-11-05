import React from "react";
import { connect } from "react-redux";
import Cell from "./Cell";

class Headers extends React.Component {
  render() {
    const headers = this.props.headers;

    return (
      <div className={"header"}>
        {this.props.headers.map((cell, j) => (
          <Cell {...cell} isHeader={true} key={cell.id} column={j} />
        ))}
      </div>
    );
  }
}

const mapStateToProps = ({ table }) => ({
  headers: table.headers,
});

export default connect(mapStateToProps, null)(Headers);
