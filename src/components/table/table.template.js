const CODES = {
    A: 65,
    Z: 90
}

function createCell(_, index) {
    return `
    <div class="cell" contenteditable="" data-index="${index}"></div>
    `
}

function createCol(char, index) {
    return `
        <div class="column" data-type="resizable" data-index="${index}">
            ${char}
            <div class="col-resize" data-resize="col"></div>
        </div>
    `
}

function createRow(index, content) {
    const resize = index ? '<div class="row-resize" data-resize="row"></div>' : ''
    return `
        <div class="row" data-type="resizable">
            <div class="row-info">
                ${index ? index : ''}
                ${resize}
            </div>
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
            .fill('')
            .map(createCell)
            .join('')
        rows.push(createRow(i + 1, cells))
    }
    return rows.join('')
}