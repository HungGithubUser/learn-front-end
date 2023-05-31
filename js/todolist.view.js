'use strict'

import { TodoListDom } from './todolist.dom'

export class TodoListView {
    constructor(todoList) {
        this.todoList = todoList
    }

    getToDoListView() {
        let htmlElement = document.createElement("div")
        let inputElement = document.createElement("input")
        inputElement.addEventListener('keyup', (e) => {
            this.#inputKeyUp(e, htmlElement)
        })
        htmlElement.appendChild(inputElement)
        return htmlElement
    }

    #inputKeyUp(event, htmlElementToBeManipulated) {
        if (event.key === "Enter") {
            this.#handleKeyEnter(htmlElementToBeManipulated)
        }
    }

    #handleKeyEnter(htmlElementToBeManipulated) {
        this.todoList.add(htmlElementToBeManipulated.firstChild.value)
        var dom = new TodoListDom(this.todoList)

        if (this.#htmlElementCurrentlyHavingToDoList(htmlElementToBeManipulated)) {
            this.#removeHtmlElementTodoList(htmlElementToBeManipulated)
        }

        htmlElementToBeManipulated.appendChild(dom.getAllAsOrderedList())
        htmlElementToBeManipulated.childNodes[0].value = ""
    }

    #htmlElementCurrentlyHavingToDoList(elementToBeManipulated) {
        return elementToBeManipulated.childNodes.length === 2
    }

    #removeHtmlElementTodoList(elementToBeManipulated) {
        elementToBeManipulated.removeChild(elementToBeManipulated.lastChild)
    }
}