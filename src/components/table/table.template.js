const CODES = {
    A: 65,
    Z: 90
}

function createCell() {
    return `
    <div class="cell" contenteditable=""></div>
    `
}

function createCol(char) {
    return `
        <div class="column">${char}</div>
    `
}

function createRow(index, content) {
    return `
        <div class="row">
            <div class="row-info">${index ? index : ''}</div>
            <div class="row-data">${content}</div>
        </div>
    `
}

function toChar(_, index) {
    return String.fromCharCode(CODES.A + index)
}


export function createTable(rowsCount = 15) {
    const colsCount = CODES.Z - CODES.A + 1
    const rows = []
    // const cols = []
    // const cells = []

    // for (let i = 0; i < colsCount; i++) {
    //     cols.push(createCol(String.fromCharCode(CODES.A + i)))
    // }
    // rows.push(createRow(cols.join('')))

    const cols = new Array(colsCount)
        .fill('')
        .map(toChar)
        .map(createCol)
        .join('')

    rows.push(createRow(null, cols))

    // for (let i = 0; i < colsCount; i++) {
    //     cells.push(createCell())
    // }

    for (let i = 0; i < rowsCount; i++) {
        const cells = new Array(colsCount)
            .fill(createCell())
            .join('')
        rows.push(createRow(i + 1, cells))
    }
    return rows.join('')
}