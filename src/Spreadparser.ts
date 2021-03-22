import Replacer from "./Replacer";
import Spreadsheet from "./SpreadsheetInterface";
import Keyable from "./KeyableInterface";

interface Cell {
    col: number;
    row: number;
    value: string;
}

const Spreadparser = (() : Keyable => {
    const transformer = new Replacer();

    function parse(original: Spreadsheet) {

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
                    const cellValue = transformer.transform(cell.value);
                    data[cell.row - 2] = data[cell.row - 2] || {};
                    data[cell.row - 2][title.value] = cellValue;
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

    function getSpreadsheetUrl(spreadsheetId: String, sheetNumber: number = 1) {
        return `https://spreadsheets.google.com/feeds/cells/${spreadsheetId}/${sheetNumber}/public/full?alt=json`
    }

    return {
        parse,
        getSpreadsheetUrl
    };
})();
