'use strict'

import { TodoListDom } from './todolist.dom.js'

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
            this.#addTodoList(event.target.value, htmlElement)
            event.target.value = ""
        }
    }

    #addTodoList(todoListItemDisplayedText, htmlElementToBeManipulated) {
        this.todoList.add(todoListItemDisplayedText)
        this.#reRenderToDoList(htmlElementToBeManipulated)
    }

    #reRenderToDoList(htmlElementToBeManipulated) {
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
        let todoOrderedList = this.#getNewTodoListOrderedListHtmlElement()
        this.#addDeleteButtons(todoOrderedList, htmlElementToBeManipulated)
        htmlElementToBeManipulated.appendChild(todoOrderedList)
    }

    #getNewTodoListOrderedListHtmlElement() {
        return new TodoListDom()
            .withListCssClass("ordered-todo-list")
            .withListItemsCssClass("ordered-todo-list--items")
            .withDeleteButton()
            .getOrderedList(this.todoList.getAll())
    }

    #addDeleteButtons(todoOrderedList, htmlElementToBeManipulated) {
        let deleteButtons = TodoListDom.getAllDeleteButtons(todoOrderedList)
        this.#wireUpDeleteButtonsClickEvents(deleteButtons, htmlElementToBeManipulated)
    }

    #wireUpDeleteButtonsClickEvents(deleteButtons, htmlElementToBeManipulated) {
        for (let button of deleteButtons) {
            button.addEventListener("click", (e) => {
                this.#deleteTodoListItem(Number(e.target.value), htmlElementToBeManipulated)
            })
        }
    }

    #deleteTodoListItem(todoListItemId, htmlElementToBeManipulated) {
        this.todoList.removeById(todoListItemId)
        this.#reRenderToDoList(htmlElementToBeManipulated)
    }
}