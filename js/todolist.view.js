'use strict'

import { TodoListDom } from './todolist.dom'

export class TodoListView {
    constructor(todoList) {
        this.todoList = todoList
    }

    render(htmlElement) {
        let inputElement = document.createElement("input")
        htmlElement.appendChild(inputElement)
        inputElement.addEventListener('keyup', (e) => {
            this.#inputKeyUp(e, htmlElement)
        })
    }

    #inputKeyUp(event, elementToBeManipulated) {
        if (event.key === "Enter") {
            this.todoList.add(event.target.value)
            var dom = new TodoListDom(this.todoList)

            if (elementToBeManipulated.childNodes.length === 2) {
                elementToBeManipulated.removeChild(elementToBeManipulated.lastChild);
            }

            elementToBeManipulated.appendChild(dom.getAllAsOrderedList())
            elementToBeManipulated.childNodes[0].value = ""
        }
    }
}