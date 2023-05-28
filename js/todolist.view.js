'use strict'

export class TodoListView {

    render(htmlElement) {
        let inputElement = document.createElement("input")
        htmlElement.appendChild(inputElement)
        inputElement.addEventListener('keyup', (e) => { this.#inputKeyUp(e, htmlElement) })
    }

    #inputKeyUp(event, element) {
        element.appendChild(document.createElement("a"))
    }
}