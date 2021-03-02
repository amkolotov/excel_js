import {CHANGE_TEXT, CHANGE_STYLES, TABLE_RESIZE, APPLY_STYLE, CHANGE_TITLE} from "@/redux/types";
import {toInlineStyles} from "@/core/utils";
import {defaultStyles} from "@/constants";

export function rootReducer(state, action) {
    let field
    let val
    switch(action.type) {
        case TABLE_RESIZE:
            field = action.data.type === 'col' ? 'colState' : 'rowState'
            return {...state, [field]: value(state, action, field)}
        case CHANGE_TEXT:
            field = 'dataSet'
            return {...state, currentText: action.data.value, [field]: value(state, action, field)}
        case CHANGE_STYLES:
            return {...state, currentStyles: action.data}
        case APPLY_STYLE:
            field = 'styleState'
            val = state[field]
            action.data.ids.forEach(id => {
                val[id] = {...val[id], ...action.data.value}
            })
            return {...state, [field]: val, currentStyles: {...state.currentStyles, ...action.data.value}}
        case CHANGE_TITLE:
            return {...state, title: action.data}
        default:
            return state
    }

}

function value(state, action, field) {
    let value = state[field]
    value[action.data.id] = action.data.value
    return value
}