import StringToValue from "./StringToValue";

test('[BRASILIA] StringToValue exists', () => {
    expect(StringToValue).toBeDefined();
});

test('[BUENOS_AIRES] StringToValue parses boolean values', () => {
    const stringToValueInstance = new StringToValue();
    expect(stringToValueInstance.transform("TRUE")).toBe(true);
    expect(stringToValueInstance.transform("FALSE")).toBe(false);
    expect(stringToValueInstance.transform("true")).toBe(true);
    expect(stringToValueInstance.transform("false")).toBe(false);
    expect(stringToValueInstance.transform("True")).toBe(true);
    expect(stringToValueInstance.transform("False")).toBe(false);
});

test('[SANTIAGO] StringToValue parses numeric values', () => {
    const stringToValueInstance = new StringToValue();
    expect(stringToValueInstance.transform("0")).toBe(0);
    expect(stringToValueInstance.transform("22")).toBe(22);
    expect(stringToValueInstance.transform("-123123123")).toBe(-123123123);
    expect(stringToValueInstance.transform("-0.200")).toBe(-0.2);
    expect(stringToValueInstance.transform("0.990099")).toBe(0.990099);
});

test('[MONTEVIDEO] StringToValue is able to receive custom transforms', () => {
    const stringToValueInstance = new StringToValue([{
        from: /banana/gi,
        to: (x: string) => x.toUpperCase()
    }]);

    expect(stringToValueInstance.transform('banana')).toBe("BANANA");
    expect(stringToValueInstance.transform('bananana')).toBe("bananana");

});
