import {createStore} from "@/core/store/createStore";
import {rootReducer} from "@/redux/rootReducer";
import {initialState, normalizeInitialState} from "@/redux/initialState";
import {debounce, getDate, storage} from "@/core/utils";
import {Excel} from "@/components/excel/Excel";
import {Header} from "@/components/header/Header";
import {Toolbar} from "@/components/toolbar/Toolbar";
import {Formula} from "@/components/formula/Formula";
import {Table} from "@/components/table/Table";
import {Page} from "@/core/Page";

function storageName(param) {
    return `excel:${param}`
}

export class ExcelPage extends Page {
    getRoot() {
        // const param = this.param ? this.param : Date.now().toString()
        const param = this.param
        const state = storage(storageName(param))

        const store = createStore(rootReducer, normalizeInitialState(state))

        const stateListener = debounce(state => {
            storage(storageName(param), state)
        }, 300)

        store.subscribe(stateListener)
        this.excel = new Excel({
            components: [Header, Toolbar, Formula, Table],
            store
        })

        return this.excel.getRoot()

    }

    afterRender() {
        this.excel.init()
    }

    destroy() {
        this.excel.destroy()
    }
}