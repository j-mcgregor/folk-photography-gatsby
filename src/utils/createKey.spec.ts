import createKey from './createKey'

describe('CreateKey', () => {
    // TESTING ARRAY INPUT
    it('input: [] => output: "-0"', () => {
        const result = createKey([])
        const expected = '-0'

        expect(result).toBe(expected)
    })

    it('input: [""] => output: "-0"', () => {
        const result = createKey([''])
        const expected = '-0'

        expect(result).toBe(expected)
    })

    // dash added when strings joined
    it('input: ["",""] => output: "--0"', () => {
        const result = createKey(['', ''])
        const expected = '--0'

        expect(result).toBe(expected)
    })

    it('input: ["ABC","] => output: "abc--0"', () => {
        const result = createKey(['ABC', ''])
        const expected = 'abc--0'

        expect(result).toBe(expected)
    })

    it('input: ["A B C","] => output: "a-b-c--0"', () => {
        const result = createKey(['A B C', ''])
        const expected = 'a-b-c--0'

        expect(result).toBe(expected)
    })

    it('input: ["123"] => output: "123-0"', () => {
        const result = createKey(['123'])
        const expected = '123-0'

        expect(result).toBe(expected)
    })

    it('input: ["123","] => output: "123--0"', () => {
        const result = createKey(['123', ''])
        const expected = '123--0'

        expect(result).toBe(expected)
    })

    it('input: ["1 2 3","] => output: "1-2-3--0"', () => {
        const result = createKey(['1 2 3', ''])
        const expected = '1-2-3--0'

        expect(result).toBe(expected)
    })

    it('input: ["1 2 3"] => output: "1-2-3-0"', () => {
        const result = createKey(['1 2 3'])
        const expected = '1-2-3-0'

        expect(result).toBe(expected)
    })

    it('input: ["1 2 3", "A B C"] => output: "1-2-3-a-b-c-0"', () => {
        const result = createKey(['1 2 3', 'A B C'])
        const expected = '1-2-3-a-b-c-0'

        expect(result).toBe(expected)
    })

    it('input: ["1 2 3 A BC"] => output: "1-2-3-a-bc-0"', () => {
        const result = createKey(['1 2 3 A BC'])
        const expected = '1-2-3-a-bc-0'

        expect(result).toBe(expected)
    })

    it('input: ["!@#$%^&*() A B C 123","] => output: "1-2-3-a-bc-0"', () => {
        const result = createKey(['"!@#$%^&*() A B C 123'])
        const expected = '-a-b-c-123-0'

        expect(result).toBe(expected)
    })

    // TESTING STRING INPUT
    it('input: "1 2 3" => output: "1-2-3-0"', () => {
        const result = createKey('1 2 3')
        const expected = '1-2-3-0'

        expect(result).toBe(expected)
    })

    it('input: ("1 2 3", 1) => output: "1-2-3-1"', () => {
        const result = createKey('1 2 3', 1)
        const expected = '1-2-3-1'

        expect(result).toBe(expected)
    })

    it('input: "A B C" => output: "a-b-c-0"', () => {
        const result = createKey('A B C')
        const expected = 'a-b-c-0'

        expect(result).toBe(expected)
    })

    it('input: ("A B C", 1) => output: "a-b-c-1"', () => {
        const result = createKey('A B C', 1)
        const expected = 'a-b-c-1'

        expect(result).toBe(expected)
    })
})
