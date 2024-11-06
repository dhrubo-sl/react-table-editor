import * as Papa from "papaparse";
import React from "react";
import { connect } from "react-redux";
import { addRow, getAllData, validateCells } from "../../reducers";
import ExcelFileInput from "../ExcelFileInput";
import Body from "./Body";

class Table extends React.Component {
  render() {
    const { addRow, validateCells, table } = this.props;

    function alldata() {
      console.log(table);
    }

    const downloadCSV = () => {
      const data = Object.values(table)[0];
      const formattedData = data.rows.map((row) =>
        row.map((cell) => cell.value)
      );
      const csvData = Papa.unparse(formattedData);
      const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.setAttribute("href", url);
      a.setAttribute("download", "data.csv");
      a.click();

      // Clean up URL object after download
      window.URL.revokeObjectURL(url);
    };

    return (
      <div>
        <div className={"btn-bar"}>
          <div>
            <button onClick={() => addRow()}>Add Row</button>
            <button onClick={() => validateCells()}>Validate Table</button>
            <ExcelFileInput />
            <button onClick={() => downloadCSV()}>Export Table</button>
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
