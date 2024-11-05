import React from "react";
import { connect } from "react-redux";
import ExcelFileInput from "../ExcelFileInput";
import Body from "./Body";

import { addRow, getAllData, validateCells } from "../../reducers";

class Table extends React.Component {
  render() {
    const { addRow, validateCells, table } = this.props;

    function alldata() {
      console.log(table);
    }

    return (
      <div>
        <div className={"btn-bar"}>
          <div>
            <button onClick={() => addRow()}>Add Row</button>
            <button onClick={() => validateCells()}>Validate Table</button>
            <ExcelFileInput />
            <button onClick={() => alldata()}>Export Table</button>
          </div>
        </div>
        <div className={"table-wrapper"}>
          <div className={"table"}>
            {/* <Headers /> */}
            <Body />
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = {
  addRow,
  validateCells,
  getAllData,
};

const mapStateToProps = (state) => ({
  table: state,
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);
