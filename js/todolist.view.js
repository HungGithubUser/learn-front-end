'use strict'

export class TodoListView {
    constructor(todoList) {
        this.todoList = todoList
    }

    render(htmlElement) {
        let inputElement = document.createElement("input")
        htmlElement.appendChild(inputElement)
        inputElement.addEventListener('keyup', (e) => { this.#inputKeyUp(e, htmlElement) })
    }

    #inputKeyUp(event, element) {
        element.appendChild(document.createElement("a"))
        this.todoList.add("learn Java Script")
    }
}