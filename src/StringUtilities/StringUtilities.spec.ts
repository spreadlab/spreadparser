import StringUtilities from "./StringUtilities";

test('[BRASILIA] StringUtilities exists', () => {
    expect(StringUtilities).toBeDefined();
});

test('[BUENOS_AIRES] StringUtilities parses boolean values', () => {
    const stringUtilitiesInstance = new StringUtilities();
    expect(stringUtilitiesInstance.fromPatternToValue("TRUE")).toBe(true);
    expect(stringUtilitiesInstance.fromPatternToValue("FALSE")).toBe(false);
    expect(stringUtilitiesInstance.fromPatternToValue("true")).toBe(true);
    expect(stringUtilitiesInstance.fromPatternToValue("false")).toBe(false);
    expect(stringUtilitiesInstance.fromPatternToValue("True")).toBe(true);
    expect(stringUtilitiesInstance.fromPatternToValue("False")).toBe(false);
});

test('[SANTIAGO] StringUtilities parses numeric values', () => {
    const stringUtilitiesInstance = new StringUtilities();
    expect(stringUtilitiesInstance.fromPatternToValue("0")).toBe(0);
    expect(stringUtilitiesInstance.fromPatternToValue("22")).toBe(22);
    expect(stringUtilitiesInstance.fromPatternToValue("-123123123")).toBe(-123123123);
    expect(stringUtilitiesInstance.fromPatternToValue("-0.200")).toBe(-0.2);
    expect(stringUtilitiesInstance.fromPatternToValue("0.990099")).toBe(0.990099);
});

test('[MONTEVIDEO] StringUtilities is able to receive custom fromPatternToValues', () => {
    const stringUtilitiesInstance = new StringUtilities([{
        from: /banana/gi,
        to: (x: string) => x.toUpperCase()
    }]);

    expect(stringUtilitiesInstance.fromPatternToValue('banana')).toBe("BANANA");
    expect(stringUtilitiesInstance.fromPatternToValue('bananana')).toBe("bananana");
});

test('[ASSUNCION] StringUtilities can apply different case styles', () => {
   expect(StringUtilities.toCase('29 de Março')).toBe('29 de Março');
   expect(StringUtilities.toCase('29 de Março', 'none')).toBe('29 de Março');
   expect(StringUtilities.toCase('29 de Março', 'camelCase')).toBe('29DeMarco');
   expect(StringUtilities.toCase('29 de Março', 'snakeCase')).toBe('29_de_marco');
   expect(StringUtilities.toCase('  España Coração óRfão  ', 'camelCase')).toBe('espanaCoracaoOrfao');
   expect(StringUtilities.toCase('  España Coração óRfão  ', 'snakeCase')).toBe('espana_coracao_orfao');
   expect(StringUtilities.toCase('Homem---Aranha', 'snakeCase')).toBe('homem_aranha');
});
