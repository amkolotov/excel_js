import {storage} from "@/core/utils";

function toHTML(key) {
    const model = storage(key)
    const id = key.split(':')[1]
    return `
        <li class="db__record">
            <a href="#excel/${id}">${model.title}</a>
            <span>
                ${new Date(model.openedDate).toLocaleDateString()}
                ${new Date(model.openedDate).toLocaleTimeString()}
            </span>
        </li>
    `
}

function getAllKeys() {
    let keys = []
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i)
        if (!key.includes('excel')) {
            continue
        }
        keys.push(key)
    }
    return keys
}

export function createRecordsTable() {
    const keys = getAllKeys()
    if (!keys.length) {
        return 'Вы пока не создали ни одной таблицы'
    }
    return `
    <div class="db__list-header">
        <span>Название таблицы</span>
        <span>Дата открытия</span>
    </div>

    <ul class="db__list">

        ${keys.map(key => toHTML(key)).join('')}

    </ul>
    `
}
