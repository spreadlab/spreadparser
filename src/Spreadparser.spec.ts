import Spreadparser from "./Spreadparser";
import Cores from "./mocks/cores.json";
import CoresNested from "./mocks/cores-profundidade.json";
import CitiesToVisit from './mocks/cities-to-visit.json';
import CoresNestedCustomSeparator from "./mocks/cores-profundidade-separator-gt.json";
import JiraIssues from "./mocks/jira-issues.json";
import FakePeople from "./mocks/fake-people.json";
import TitleWithoutData from "./mocks/title-without-data.json";
import DataWithoutTitle from "./mocks/data-without-title.json";
import SomeEmptyRows from "./mocks/some-empty-rows.json";

test('[PETER_PARKER] Spreadparser does exists', () => {
    expect(Spreadparser).toBeDefined();
    expect(Spreadparser.parse).toBeDefined();
    expect(Spreadparser.getSpreadsheetUrl).toBeDefined();
});

test('[MILES_MORALES] Spreadparser can parse Google Spreadsheet data', () => {
    const coresSheet = Spreadparser.parse(Cores);
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

test('[HOBIE BROWN] Can parse lists', () => {
    const citiesToVisitSheet = Spreadparser.parse(CitiesToVisit);
    expect(Array.isArray(citiesToVisitSheet.data)).toBe(true);
    expect(citiesToVisitSheet.data).toEqual([
        {
            "cities": [
                "São Paulo",
                "Rio de Janeiro",
                "Fortaleza"
            ],
            "country": "Brasil"
        },
        {
            "cities": "Montevideo",
            "country": "Uruguai"
        },
        {
            "cities": [
                "Buenos Aires",
                "Mendoza"
            ],
            "country": "Argentina"
        }
    ]);
});

test('[MIGUEL OHARA] Can parse Spreadsheet data with nested objects', () => {
    const coresNestedSheet = Spreadparser.parse(CoresNested);
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
        "RGB": {"blue": 255, "green": 127, "red": 0}
    });
});

test('[PETER PORKER] .parse method can receive different options', () => {
    const coresNestedSheet = Spreadparser.parse(CoresNested, {titleCase: "camelCase"});

    coresNestedSheet.data.forEach(function (entry) {
        expect(entry.hsv.hue).toBeDefined();
        expect(entry.hsv.saturation).toBeDefined();
        expect(entry.hsv.value).toBeDefined();
        expect(entry.rgb.red).toBeDefined();
        expect(entry.rgb.green).toBeDefined();
        expect(entry.rgb.blue).toBeDefined();
    });

    expect(coresNestedSheet.data[36]).toEqual({
        nome: 'Azul claro',
        hex: '#ADD8E6',
        rgb: {
            red: 173,
            green: 216,
            blue: 230
        },
        hsv: {
            hue: '195°',
            saturation: '25%',
            value: '90%'
        },
        nomeWeb: 'lightblue'
    });

    const coresNestedCustomSeparatorSheet = Spreadparser.parse(CoresNestedCustomSeparator, {
        separator: '>',
        titleCase: "snakeCase"
    });
    coresNestedCustomSeparatorSheet.data.forEach(function (entry) {
        expect(entry.hsv.hue).toBeDefined();
        expect(entry.hsv.saturation).toBeDefined();
        expect(entry.hsv.value).toBeDefined();
        expect(entry.rgb.red).toBeDefined();
        expect(entry.rgb.green).toBeDefined();
        expect(entry.rgb.blue).toBeDefined();
    });

    expect(coresNestedCustomSeparatorSheet.data[36]).toEqual({
        nome: 'Azul claro',
        hex: '#ADD8E6',
        rgb: {
            red: 173,
            green: 216,
            blue: 230
        },
        hsv: {
            hue: '195°',
            saturation: '25%',
            value: '90%'
        },
        nome_web: 'lightblue'
    });
});

test('[TAKUYA YAMASHIRO] Can parse Spreadsheet data not starting in first row', () => {
    // Header row is less than zero
    let jiraIssues = Spreadparser.parse(JiraIssues, {separator: "__", titleCase: 'snakeCase', headerRow: -2});
    expect(jiraIssues.data[0].tipo_de_item).toBe('Advertising');
    expect(jiraIssues.data[12].resumo).toBe('Otimizar performance da Revista Pro utilizando CloudFront');
    expect(jiraIssues.data.length).toBe(13);

    // Header row is equal zero
    jiraIssues = Spreadparser.parse(JiraIssues, {separator: "__", titleCase: 'snakeCase', headerRow: 0});
    expect(jiraIssues.data[0].tipo_de_item).toBe('Advertising');
    expect(jiraIssues.data[12].resumo).toBe('Otimizar performance da Revista Pro utilizando CloudFront');
    expect(jiraIssues.data.length).toBe(13);

    // Header row is less than real first row number
    jiraIssues = Spreadparser.parse(JiraIssues, {separator: "__", titleCase: 'snakeCase', headerRow: 6});
    expect(jiraIssues.data[0].tipo_de_item).toBe('Advertising');
    expect(jiraIssues.data[12].resumo).toBe('Otimizar performance da Revista Pro utilizando CloudFront');
    expect(jiraIssues.data.length).toBe(13);

    // Header row is not present but content doesnt starts at row 1
    jiraIssues = Spreadparser.parse(JiraIssues);
    expect(jiraIssues.data[0]['Tipo de item']).toBe('Advertising');
    expect(jiraIssues.data[12].Resumo).toBe('Otimizar performance da Revista Pro utilizando CloudFront');
    expect(jiraIssues.data.length).toBe(13);

    // Header is not the first line with content
    const fakePeople = Spreadparser.parse(FakePeople, {headerRow: 5, separator: '>', titleCase: "camelCase"});
    expect(fakePeople.data[fakePeople.data.length - 1]).toEqual({
        "nome": "Geraldo Yago Nicolas Brito",
        "idade": 60,
        "nascimento": "11/05/1959",
        "signo": "Touro",
        "email": "geraldoyagonicolasbrito_@exemplo.org.br",
        "endereco": {
            "logradouro": "Rua Tietinga",
            "numero": 997,
            "cidade": "São Paulo",
            "estado": "SP"
        },
        "telefone": "(11) 3885-2421"
    })
});

test('[OTTO OCTAVIUS] Parses insufficient data', () => {
    const titleWithoutData = Spreadparser.parse(TitleWithoutData);
    titleWithoutData.data.forEach(item => {
        expect(item["Idade"]).toBeUndefined();
    });
    expect(titleWithoutData.data[3]).toEqual({ Nome: 'Denise', Sexo: 'Feminino' });

    const dataWithoutTitle = Spreadparser.parse(DataWithoutTitle);
    dataWithoutTitle.data.forEach(item => {
        expect(Object.keys(item).length).toBeLessThan(4);
    });
    expect(dataWithoutTitle.data[dataWithoutTitle.data.length -1]).toEqual({ Id: 4, Price: 40 });

    let someEmptyRows = Spreadparser.parse(SomeEmptyRows, {separator: '>', titleCase: 'camelCase'});
    expect(someEmptyRows.data.length).toBe(3);

    someEmptyRows = Spreadparser.parse(SomeEmptyRows, {
        includeEmptyRows: true,
        separator: '>',
        titleCase: 'camelCase'
    });
    expect(someEmptyRows.data.length).toBe(4);
});

test('[AARON AIKMAN] Methods getSpreadsheetUrl works', () => {
    const urlWithoutNumber = Spreadparser.getSpreadsheetUrl('abc123');
    expect(urlWithoutNumber).toBe('https://spreadsheets.google.com/feeds/cells/abc123/1/public/full?alt=json');
    const urlWithNumber = Spreadparser.getSpreadsheetUrl('abc123', 28);
    expect(urlWithNumber).toBe('https://spreadsheets.google.com/feeds/cells/abc123/28/public/full?alt=json');
});
