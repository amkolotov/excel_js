import {DomListener} from '@/core/DomListener';

export class ExcelComponent extends DomListener {

    constructor($root, options = {}) {
        super($root, options.listeners);
        this.name = options.name || ''
        this.emitter = options.emitter
        this.unsubscribers = []

        this.prepare()
    }
    // Настраиваем наш компонент до init
    prepare() {

    }

    // Возвращает шаблон компонента
    toHTML() {
        return ''
    }
    // Уведомляем слушателей о событие
    $emit(event, ...args) {
        this.emitter.emit(event, ...args)
    }
    // Подписываемся на событие
    $on(event, fn) {
        const unsub = this.emitter.subscribe(event, fn)
        this.unsubscribers.push(unsub)
    }
    // Инициализируем компонент, добавляем DOM слушателей
    init() {
        this.initDOMListener()
    }
    // Удаляем компонент, чистим слушателей
    destroy() {
        this.removeDOMListener()
        this.unsubscribers.forEach(unsub => unsub())
    }

}
