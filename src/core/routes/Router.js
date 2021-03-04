import {ActiveRoute} from "@/core/routes/ActiveRoute";
import {DashboardPage} from "@/pages/DashboardPage";

const {$} = require("@/core/dom");

export class Router {
    constructor(selector, routes) {
        if (!selector) {
            throw new Error('Selector is not provided in Router')
        }
        this.$placeholder = $(selector)
        this.routes = routes
        this.page = null

        this.changePageHandler = this.changePageHandler.bind(this)

        this.init()
    }

    init() {
        // window.onhashchange = this.changePageHandler
        window.addEventListener('hashchange', this.changePageHandler)
        this.changePageHandler()
    }

    changePageHandler(event) {
        if (this.page) {
            this.page.destroy()
        }

        this.$placeholder.clear()

        const Page = this.routes[ActiveRoute.page]
        if (!Page){
            this.page = new DashboardPage(ActiveRoute.param)
            window.location.href='#dashboard'
        } else {
            this.page = new Page(ActiveRoute.param)
        }

        this.$placeholder.append(this.page.getRoot())
        this.page.afterRender()
    }

    remove() {
        window.removeEventListener('hashchange', this.changePageHandler)
    }

}