import React from "react";
import { connect } from "react-redux";
import { initialiseTable } from "../reducers";
import Table from "./Table/Table";

class TableWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.props.initialiseTable();
  }

  render() {
    return (
      <div className={"app"}>
        <div className={"content"}>
          <Table />
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = {
  initialiseTable,
};

export default connect(null, mapDispatchToProps)(TableWrapper);
