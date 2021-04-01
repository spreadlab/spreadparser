import Spreadsheet from "./SpreadsheetInterface";
import Keyable from "./KeyableInterface";
import NestedObject from "./NestedObject/NestedObject";
import StringUtilities from "./StringUtilities/StringUtilities";
import {CaseStyles} from "./CaseStyles";

interface Cell {
    col: number;
    row: number;
    value: string;
}

interface SpreadparserOptions {
    separator?: string;
    titleCase?: CaseStyles;
    headerRow?: number
}

class Spreadparser {

    private static DefaultSpreadparserOptions: SpreadparserOptions = {
        separator: '__',
        titleCase: 'none',
        headerRow: 1
    };

    static parse(original: Spreadsheet, options: SpreadparserOptions = Spreadparser.DefaultSpreadparserOptions) {
        options = {...Spreadparser.DefaultSpreadparserOptions, ...options};

        const stringUtilities = new StringUtilities();
        let [headerRowNumber, firstContentRowNumber] = [1, 2];

        const data = () => {
            return original.feed.entry.map(entry => {
                return {
                    col: Number(entry.gs$cell.col),
                    row: Number(entry.gs$cell.row),
                    value: String(entry.gs$cell.$t)
                };
            }).reduce(function (data: Keyable[], cell: Cell, index: number, cells: Cell[]) {

                if(index === 0) {
                    const rowTitleNumber = Math.max(options.headerRow || 1, cells[0].row);
                    [headerRowNumber, firstContentRowNumber] = [rowTitleNumber, rowTitleNumber + 1];
                }

                if (cell.row >= firstContentRowNumber) {

                    const title: Keyable = cells.find(function(c: Cell): boolean {
                        return c.col === cell.col && c.row === headerRowNumber;
                    }) || {};

                    data[cell.row - firstContentRowNumber] = data[cell.row - firstContentRowNumber] || {};

                    NestedObject.assign(
                        data[cell.row - firstContentRowNumber],
                        stringUtilities.fromPatternToValue(cell.value),
                        title.value,
                        options
                    );
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
