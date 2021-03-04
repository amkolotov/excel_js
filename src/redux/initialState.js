import {clone, getDate, storage} from "@/core/utils";
import {defaultStyles, defaultTitle} from "@/constants";

const defaultState = {
    title: defaultTitle,
    colState: {},
    rowState: {},
    dataSet: {},
    styleState: {},
    openedDate: new Date().toJSON(),
    currentName: 'Новая таблица',
    currentStyles: defaultStyles
}

const normalize = (state) => ({
    ...state,
    currentStyles: defaultStyles,
    currentText: ''
})

export function normalizeInitialState(state) {
    return state ? normalize(state) : clone(defaultState)
}

