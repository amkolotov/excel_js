export function parse(value = '') {
    if (value.startsWith('=')) {
        try {
            return String(eval(value.slice(1)) || value)
            // return eval(value.slice(1)) || value
        } catch (e) {
            console.log(`Skipping parse error`, e.message)
            return value
        }
    }
    return value
}