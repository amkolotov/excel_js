export class TableSelections {
    static className = 'selected'

    constructor() {
        this.group = []
        this.current = null
    }

    select($el) {
        this.clear()
        $el.focus().addClass(TableSelections.className)
        this.group.push($el)
        this.current = $el
    }

    clear() {
        this.group.forEach($el => $el.removeClass(TableSelections.className))
        this.group = []
    }

    selectGroup($group = []) {
        this.clear()
        this.group = $group
        this.group.forEach($el => $el.addClass(TableSelections.className))
    }
}