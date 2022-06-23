import { convertEnvStringToArray } from "../convertEnvStringToArray";

test('no string', () => {
    expect(
        convertEnvStringToArray()
    ).toBe(undefined);
})

test('string', () => {
    expect(
        convertEnvStringToArray('singleString')
    ).toStrictEqual(['singleString']);
})

test('JSON encoded array', () => {
    expect(
        convertEnvStringToArray('["json", "array"]')
    ).toStrictEqual(['json', 'array']);
})

test('JSON encoded array escaped characters', () => {
    expect(
        convertEnvStringToArray('[\"json\", \"array\"]')
    ).toStrictEqual(['json', 'array']);
})

test('JSON encoded object', () => {
    expect(
        convertEnvStringToArray('{"json":"object", "encoded": "fields"}')
    ).toStrictEqual(['json', 'encoded'])
})