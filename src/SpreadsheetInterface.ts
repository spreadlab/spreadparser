export default interface Spreadsheet {
    encoding: string;
    version: string;
    feed: {
        updated: {
            $t: string;
        };
        title: {
            $t: string;
        };
        entry: RawCell[];
    };
}

interface RawCell {
    gs$cell: {
        $t: string;
        col: string;
        row: string;
        inputValue: string;
    };
}
