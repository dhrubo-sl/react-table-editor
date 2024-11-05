import * as csv from "papaparse";
import React from "react";
import { connect } from "react-redux";
import { setTable } from "../reducers";

class ExcelFileInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleFile = this.handleFile.bind(this);
  }
  handleFile(file) {
    csv.parse(file, {
      complete: (res) => {
        console.log(res.data);
        this.props.setTable(res.data);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  render() {
    return <DataInput handleFile={this.handleFile} />;
  }
}

const mapDispatchToProps = {
  setTable,
};

export default connect(null, mapDispatchToProps)(ExcelFileInput);

class DataInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.fileInput = React.createRef();
  }
  handleChange(e) {
    const files = e.target.files;
    if (files && files[0]) this.props.handleFile(files[0]);
  }
  render() {
    return (
      <>
        <button
          style={{ marginLeft: 10 }}
          onClick={() => this.fileInput.current.click()}
        >
          <i className="fas fa-upload" />
          &nbsp; Import File
        </button>
        <input
          ref={this.fileInput}
          type="file"
          hidden
          accept={SheetJSFT}
          onChange={this.handleChange}
        />
      </>
    );
  }
}

const SheetJSFT = [
  "xlsx",
  "xlsb",
  "xlsm",
  "xls",
  "xml",
  "csv",
  "txt",
  "ods",
  "fods",
  "uos",
  "sylk",
  "dif",
  "dbf",
  "prn",
  "qpw",
  "123",
  "wb*",
  "wq*",
  "html",
  "htm",
]
  .map(function (x) {
    return "." + x;
  })
  .join(",");
