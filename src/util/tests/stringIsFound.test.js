import stringIsFound from "../stringIsFound";

test('no object', () => {
    expect(
        stringIsFound('hello') 
    ).toBe(false)
})

test('empty object', () => {
    expect(
        stringIsFound('hello', {})
    ).toBe(false);
})

test('in string', () => {
    expect(
        stringIsFound('hello', 'hello') 
    ).toBe(true)
})

test('not in string', () => {
    expect(
        stringIsFound('hello', 'not present')
    ).toBe(false)
})

test('in array', () => {
    expect(
        stringIsFound('hello', ['hello', 'test']) 
    ).toBe(true)
})

test('not in array', () => {
    expect(
        stringIsFound('hello', ['not', 'present'])
    ).toBe(false)
})

test('in object', () => {
    expect(
        stringIsFound('hello', {
            'hello': 'world',
            'foo': 'bar'
        }) 
    ).toBe(true)
})

test('not in object', () => {
    expect(
        stringIsFound('hello', {
            'not': 'present',
            'foo': 'bar'
        })
    ).toBe(false)
})