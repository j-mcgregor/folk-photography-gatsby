// RULES
// 1. Each string should have '-' not ' '
// 2. Should be lower case
// 3. Should join to the index

const formatString = (str: string) =>
    str.toLowerCase().replace(/[^0-9a-zA-Z]+/g, '-')

export default (value: string | string[], index = 0) => {
    if (Array.isArray(value)) {
        return `${value.map(formatString).join('-')}-${index}`
    } else {
        return `${formatString(value)}-${index}`
    }
}
