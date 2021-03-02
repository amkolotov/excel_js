import {toInlineStyles} from "@/core/utils";
import {defaultStyles} from "@/constants";
import {parse} from "@/core/parse";

const CODES = {
    A: 65,
    Z: 90
}

const DEFAULT_WIDTH = 120
const DEFAULT_HEIGHT = 24

function getWidth(state, index) {
    return (state[index] || DEFAULT_WIDTH ) + 'px'
}

function getHeight(state, index) {
    return (state[index] || DEFAULT_HEIGHT ) + 'px'
}

function createCell(state, row) {
    return function (_, col) {
        const id = `${row}:${col}`
        const width = getWidth(state.colState, col)
        const data = state.dataSet[id] || ''
        const styles = toInlineStyles({...defaultStyles, ...state.styleState[id]})
        return `
        <div 
        class="cell" 
        contenteditable="" 
        data-col="${col}" 
        data-id="${id}" 
        data-type="cell"
        data-value="${data}"
        style="${styles}; width: ${width};"
        >
        ${parse(data)}
        </div>
        `
    }
}

function createCol({col, index, width}) {
    return `
        <div class="column" data-type="resizable" data-col="${index}" style="width: ${width};">
            ${col}
            <div class="col-resize" data-resize="col"></div>
        </div>
    `
}

function createRow(index, content, state) {
    const height = index ? getHeight(state, index) : 0
    const resize = index ? '<div class="row-resize" data-resize="row"></div>' : ''
    return `
        <div class="row" data-type="resizable" data-row=${index} style="height: ${height};">
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

function withWidthFrom(state) {
    return (col, index) => {
        return {col, index, width: getWidth(state, index)}
        }
}


export function createTable(rowsCount = 15, state) {
    console.log('State: ', state)
    const colsCount = CODES.Z - CODES.A + 1
    const rows = []

    const cols = new Array(colsCount)
        .fill('')
        .map(toChar)
        .map(withWidthFrom(state.colState))
        .map(createCol)
        .join('')

    rows.push(createRow(null, cols, {}))

    for (let row = 0; row < rowsCount; row++) {
        const cells = new Array(colsCount)
            .fill('')
            .map(createCell(state, row))
            .join('')
        rows.push(createRow(row + 1, cells, state.rowState))
    }
    return rows.join('')
}