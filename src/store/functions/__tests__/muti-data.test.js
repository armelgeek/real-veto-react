it('should be even', () => {
    expect(2 % 2).toBe(0);
});
/*
it.each([2,4,6])('should be even', (n) => {
    expect(n % 2).toBe(0);
});
it.each([2,4,5,6])('%i should be even', (n) => {
    expect(n % 2).toBe(0);
});
it.each([[2,4], [6,36], [8,64]])('can square %i to %s', (n, expected) => {
    expect(n*n).toBe(expected);
});
it.each`
      n     | expected
      ${1}  | ${1}
      ${2}  | ${4}
      ${4}  | ${16}
      ${12} | ${144}
    `('can square $n to $expected', ({ n, expected }) => {
            expect(n*n).toBe(expected);
});
describe.each`
    x     | y
    ${10} | ${2}
    ${9}  | ${3}
    ${8}  | ${4}
`('With x=$x and y=$y', ({x, y}) => {
    it('x should be larger then y', () => {
        expect(x).toBeGreaterThan(y);
    });

    it('should x should by dividable by y without rest', () => {
        expect(x % y).toBe(0);
    });
});
*/