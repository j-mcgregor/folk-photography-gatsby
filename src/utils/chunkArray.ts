export function chunkArray<T>(array: T[], n: number): Array<T[]> {
    const copy: T[] = [...array]
    const result: Array<T[]> = []

    while (copy.length) {
        const num: number = Math.ceil(copy.length / n--)
        const item: T[] = copy.splice(0, num)
        result.push(item)
    }
    return result
}
