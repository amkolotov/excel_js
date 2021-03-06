import {$} from "@/core/dom";

export function resizeHandler($root, event) {
    return new Promise(resolve => {
        const $resizer = $(event.target)

        const $parent = $resizer.closest('[data-type="resizable"]')
        const coords = $resizer.getCoords()
        let delta, value
        const type = event.target.dataset.resize
        const sideProp = type === 'col' ? 'bottom' : 'right'
        $resizer.css({[sideProp]: '-5000px'})

        document.onmousemove = e => {
            if (type === 'col') {
                delta = coords.right - e.pageX
                $resizer.css({right: `${delta}px`})
            } else {
                delta = coords.bottom - e.pageY
                $resizer.css({bottom: `${delta}px`})
            }
        }

        document.onmouseup = e => {
            const coordsResize = $resizer.getCoords()
            const coordsParent = $parent.getCoords()
            if (type === 'col') {
                delta = coordsResize.right - coords.right
                value = coordsParent.width + delta
                $parent.css({width: `${value}px`})
                const col = $parent.data.col
                const cells = $root.findAll(`[data-col="${col}"]`)
                cells.forEach(el => el.style.width = value + 'px')
            } else {
                delta = coordsResize.bottom - coords.bottom
                value = coordsParent.height + delta
                $parent.css({height: `${value}px`})
                console.log($parent)
            }

            resolve({
                type,
                value,
                id: $parent.data[type]
            })

            $resizer.css({
                bottom: 0,
                right: 0
            })

            document.onmousemove = null
            document.onmouseup = null
        }

    })

}