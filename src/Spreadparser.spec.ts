import Spreadparser from "./Spreadparser";
// import Cores from "./mocks/cores.json";
// const coresSheet = Spreadparser.parse(Cores);

test('[PETER_PARKER] Spreadparser does exists', () => {
    expect(Spreadparser).toBeDefined();
    expect(Spreadparser.parse).toBeDefined();
    expect(Spreadparser.getSpreadsheetUrl).toBeDefined();
});

// test('[MILES_MORALES] Spreadparser can parse Google Spreadsheet data', () => {
//    expect(Array.isArray(coresSheet.data)).toBe(true);
//    expect(coresSheet.updated).toBe("2021-03-21T01:46:26.194Z");
//    expect(coresSheet.title).toBe("Cores");
//    expect(coresSheet.data.length).toBe(235);
//
//    expect(coresSheet.data[2]).toEqual({
//        Nome: "Azul turquesa brilhante",
//        HEX: "#00DDFF",
//        RGB: "40,200,240",
//        HSV: "200°,140%,120%"
//    });
//
// });
