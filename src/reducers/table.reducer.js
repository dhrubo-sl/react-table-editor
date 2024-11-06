import { request } from "../services/api.service";

const ADD_COLUMN = "ADD_COLUMN";
const DELETE_COLUMN = "DELETE_COLUMN";
const ADD_ROW = "ADD_ROW";
const DELETE_ROW = "DELETE_ROW";
const UPDATE_CELL = "UPDATE_CELL";
const SET_HEADERS = "SET_HEADERS";
const SET_BODY = "SET_BODY";
const SET_TABLE = "SET_TABLE";
const VALIDATE_CELLS = "VALIDATE_CELLS";
const PARSE_CELLS = "PARSE_CELLS";
const LIST_SURVEYS = "LIST_SURVEYS";
const CREATE_PATIENTS_AND_SEND_SURVEYS = "CREATE_PATIENTS_AND_SEND_SURVEYS";
const ALL_DATA = "ALL_DATA";

export const addColumn = (after) => ({ type: ADD_COLUMN, after });
export const deleteColumn = (column) => ({ type: DELETE_COLUMN, column });
export const addRow = (after) => ({ type: ADD_ROW, after });
export const deleteRow = (row) => ({ type: DELETE_ROW, row });
export const updateCell = (row, column, value) => ({
  type: UPDATE_CELL,
  row,
  column,
  value,
});
export const setHeaders = (headers) => ({ type: SET_HEADERS, headers });
export const setBody = (body) => ({ type: SET_BODY, body });
export const setTable = (rows) => (dispatch) => {
  dispatch({ type: SET_TABLE, rows });
};
export const validateCells = () => ({ type: VALIDATE_CELLS });
export const parseCells = () => ({ type: PARSE_CELLS });

export const listSurveys = () => async (dispatch) => {
  return request(LIST_SURVEYS).then(({ response }) =>
    dispatch({ type: LIST_SURVEYS, surveys: response })
  );
};

export const getAllData = () => (dispatch) => {
  return dispatch({ type: ALL_DATA });
};

export const createPatientsAndSendSurveys = () => (dispatch) => {
  return dispatch(validateCells());
};

export const initialiseTable = () => (dispatch) => {
  return request(LIST_SURVEYS)
    .then(({ response }) => dispatch({ type: LIST_SURVEYS, surveys: response }))
    .then(() => dispatch(addRow()));
};

const getNewCell = ({ value = "", readOnly = null, type = "text" } = {}) => {
  const cell = {
    id: Math.random(),
    type,
    value,
    readOnly: false,
  };
  return cell;
};

const initialState = {
  rows: [],
};

export default (state = initialState, action) => {
  console.log({ state, action });

  switch (action.type) {
    case ADD_COLUMN:
      const { after } = action;
      const oldHeaders = state.rows[0];
      const newHeader = getNewCell();
      // add new header cell to existing header row
      const headersLeft = [...oldHeaders].slice(0, after + 1);
      const headersRight = [...oldHeaders].slice(after + 1);
      const headers = [...headersLeft, newHeader, ...headersRight];
      // add new column to existing rows
      const rows = state.rows.map((row) => {
        const newRowCell = getNewCell();
        const left = [...row].slice(0, after + 1);
        const right = [...row].slice(after + 1);
        const newRow = [...left, newRowCell, ...right];
        return newRow;
      });

      return { ...state, rows };

    case DELETE_COLUMN: {
      const { column = 0 } = action;
      // const headersLeft = [...state.headers].slice(0, column);
      // const headersRight = [...state.headers].slice(column + 1);
      // const headers = [...headersLeft, ...headersRight];

      const rows = state.rows.map((row) => {
        const cellsLeft = [...row].slice(0, column);
        const cellsRight = [...row].slice(column + 1);
        return [...cellsLeft, ...cellsRight];
      });

      return {
        ...state,
        rows,
      };
    }
    case ADD_ROW: {
      const { after = 0 } = action;
      const newColumns = state.rows[0].map((h) => {
        const type = "text";
        const value = "";
        return getNewCell({ type, value });
      });
      const newRow = [newColumns];
      const rowsBefore = [...state.rows].slice(0, after);
      const rowsAfter = [...state.rows].slice(after);
      const rows = [...rowsBefore, ...newRow, ...rowsAfter];
      return { ...state, rows };
    }
    case DELETE_ROW: {
      const { row } = action;
      const rowsBefore = [...state.rows].slice(0, row);
      const rowsAfter = [...state.rows].slice(row + 1);
      return { ...state, rows: [...rowsBefore, ...rowsAfter] };
    }
    case UPDATE_CELL: {
      const { row, column, value } = action;

      // update cell
      if (typeof row !== "undefined") {
        const rows = JSON.parse(JSON.stringify(state.rows));
        rows[row][column].value = value;
        // const rows = state.rows.map((r, i) => {
        //   return r.map((cell, j) => {
        //     if (i === row && j === column) {
        //       cell.value = value;
        //     }
        //     return cell;
        //   });
        // });
        return { ...state, rows };
      }

      // update header
      // const headers = state.headers.map((h, i) => {
      //   if (i === column) {
      //     h.value = value;
      //   }
      //   return h;
      // });
      return { ...state };
    }
    case SET_TABLE: {
      const { rows } = action;
      const totalRows = rows.length;
      const columnLength = rows[0].length;

      const newRows = [];
      for (let i = 0; i < totalRows; i++) {
        const tmp = [];

        for (let j = 0; j < columnLength; j++) {
          const value = rows[i][j] || "";
          tmp.push(getNewCell({ value }));
        }

        const hasValue = tmp.some((element, index, array) => {
          return element.value != "";
        });

        if (hasValue) {
          newRows.push(tmp);
        }
      }

      return { ...state, rows: newRows };
    }
    case VALIDATE_CELLS: {
      return { ...state };
    }
    case PARSE_CELLS: {
      const { headers, rows } = state;
      const newRows = rows.map((row) => {
        return row.map((cell, i) => {
          if (
            headers[i].parse &&
            Array.isArray(cell.errors) &&
            cell.errors.length === 0
          ) {
            const updatedCell = JSON.parse(JSON.stringify(cell));
            updatedCell.value = headers[i].parse(updatedCell.value);
            return updatedCell;
          }
          return cell;
        });
      });
      return { ...state, rows: newRows };
    }
    case LIST_SURVEYS: {
      return { ...state };
    }
    case ALL_DATA: {
      return { ...state };
    }
    default:
      return state;
  }
};
