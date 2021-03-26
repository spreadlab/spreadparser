import Spreadparser from "./Spreadparser";
import Cores from "./mocks/cores.json";
import CoresNested from "./mocks/cores-profundidade.json";

const coresSheet = Spreadparser.parse(Cores);
const coresNestedSheet = Spreadparser.parse(CoresNested);

test('[PETER_PARKER] Spreadparser does exists', () => {
    expect(Spreadparser).toBeDefined();
    expect(Spreadparser.parse).toBeDefined();
    expect(Spreadparser.getSpreadsheetUrl).toBeDefined();
});

test('[MILES_MORALES] Spreadparser can parse Google Spreadsheet data', () => {
    expect(Array.isArray(coresSheet.data)).toBe(true);
    expect(coresSheet.updated).toBe("2021-03-21T01:46:26.194Z");
    expect(coresSheet.title).toBe("Cores");
    expect(coresSheet.data.length).toBe(235);

    expect(coresSheet.data[2]).toEqual({
        Nome: "Azul turquesa brilhante",
        HEX: "#00DDFF",
        RGB: "40,200,240",
        HSV: "200°,140%,120%"
    });
});

test('[MIGUEL OHARA] Can parse Spreadsheet data with nestted objects', () => {
    expect(Array.isArray(coresNestedSheet.data)).toBe(true);
    coresNestedSheet.data.forEach(function (entry) {
        expect(entry.HSV.hue).toBeDefined();
        expect(entry.HSV.saturation).toBeDefined();
        expect(entry.HSV.value).toBeDefined();
        expect(entry.RGB.red).toBeDefined();
        expect(entry.RGB.green).toBeDefined();
        expect(entry.RGB.blue).toBeDefined();
    });

    expect(coresNestedSheet.data[35]).toEqual({
        "HEX": "#007FFF",
        "HSV": {"hue": "210°", "saturation": "100%", "value": "100%"},
        "Nome": "Azul celeste brilhante",
        "RGB": {"blue": "255", "green": "127", "red": "0"}
    });
});
