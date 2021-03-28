import StringToValue from "./StringToValue/StringToValue";
import Spreadsheet from "./SpreadsheetInterface";
import Keyable from "./KeyableInterface";
import NestedObject from "./NestedObject/NestedObject";

interface Cell {
    col: number;
    row: number;
    value: string;
}

class Spreadparser {

    static parse(original: Spreadsheet) {

        const stringToValue = new StringToValue();

        const data = () => {
            return original.feed.entry.map(entry => {
                return {
                    col: Number(entry.gs$cell.col),
                    row: Number(entry.gs$cell.row),
                    value: String(entry.gs$cell.$t)
                };
            }).reduce(function(data: Keyable[], cell: Cell, index: number, cells: Cell[]) {
                if(cell.row >= 2) {
                    const title : Keyable = cells.find((c: Cell): boolean => c.col === cell.col && c.row === 1) || {};
                    data[cell.row - 2] = data[cell.row - 2] || {};
                    NestedObject.assign(data[cell.row - 2], stringToValue.transform(cell.value), title.value, "__");
                }
                return data;
            }, []);
        };

        return {
            title: original.feed.title.$t,
            updated: original.feed.updated.$t,
            data: data()
        }
    }

    static getSpreadsheetUrl(spreadsheetId: String, sheetNumber: number = 1) {
        return `https://spreadsheets.google.com/feeds/cells/1Rr2y3ljAJPApYXcPyLXwxLciUCxz8XCu1Q0OnWH1l-U/3/public/full?alt=json`
    }
}
export default Spreadparser;
