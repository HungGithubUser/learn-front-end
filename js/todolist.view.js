'use strict'

import { TodoListDomBuilder } from './todolist.dom.js'

export class TodoListView {
    constructor(todoList) {
        this.todoList = todoList
    }

    getToDoListView() {
        let htmlElement = document.createElement("div")
        let inputElement = this.#getInputElementForAddingTodoList()
        this.#wireUpInputElementToHtmlElement(inputElement, htmlElement)
        return htmlElement
    }

    #getInputElementForAddingTodoList() {
        let input = document.createElement("input")
        input.setAttribute("aria-label", "add to do list")
        input.setAttribute("placeholder", "Add to do list")
        return input
    }

    #wireUpInputElementToHtmlElement(inputElement, htmlElement) {
        inputElement.addEventListener('keyup', (e) => {
            this.#inputKeyUp(e, htmlElement)
        })
        htmlElement.appendChild(inputElement)
    }

    #inputKeyUp(event, htmlElement) {
        if (event.key === "Enter") {
            this.#addTodoList(event.target, htmlElement)
            event.target.value = ""
        }
    }

    #addTodoList(htmlInputElement, htmlElementToBeManipulated) {
        this.todoList.add(htmlInputElement.value)
        this.#renderToDoList(htmlElementToBeManipulated)
    }

    #renderToDoList(htmlElementToBeManipulated) {
        if (this.#haveOldTodoList(htmlElementToBeManipulated)) {
            this.#removeOldTodoList(htmlElementToBeManipulated)
        }
        this.#renderNewToDoList(htmlElementToBeManipulated)
    }

    #haveOldTodoList(elementToBeManipulated) {
        return elementToBeManipulated.childNodes.length === 2
    }

    #removeOldTodoList(elementToBeManipulated) {
        elementToBeManipulated.removeChild(elementToBeManipulated.lastChild)
    }

    #renderNewToDoList(htmlElementToBeManipulated) {
        let todoList = this.#getNewTodoListOrderedListHtmlElement()
        let deleteButton = todoList.querySelector(TodoListDomBuilder.deleteButtonNameQuerySelector)
        if (deleteButton) {
            deleteButton.addEventListener("click", (e) => {
                this.todoList.removeById(Number(e.target.value))
                this.#renderToDoList(htmlElementToBeManipulated)
            })
        }
        htmlElementToBeManipulated.appendChild(todoList)
    }

    #getNewTodoListOrderedListHtmlElement() {
        return new TodoListDomBuilder()
            .withListCssClass("ordered-todo-list")
            .withListItemsCssClass("ordered-todo-list--items")
            .withDeleteButton()
            .getOrderedList(this.todoList.getAll())
    }
}