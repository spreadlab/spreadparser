import Spreadsheet from "./SpreadsheetInterface";
import Keyable from "./KeyableInterface";
import NestedObject from "./NestedObject/NestedObject";
import StringUtilities from "./StringUtilities/StringUtilities";

interface Cell {
    col: number;
    row: number;
    value: string;
}

class Spreadparser {

    static parse(original: Spreadsheet) {

        const stringUtilities = new StringUtilities();

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
                    NestedObject.assign(data[cell.row - 2], stringUtilities.fromPatternToValue(cell.value), title.value, "__");
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
        return `https://spreadsheets.google.com/feeds/cells/${spreadsheetId}/${sheetNumber}/public/full?alt=json`
    }
}
export default Spreadparser;
