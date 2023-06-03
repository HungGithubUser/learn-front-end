'use strict'

import { TodoListDomBuilder } from './todolist.dombuilder.js'

export class TodoListViewBuilder {
    static inputTagName = "input"
    #todoList
    #hasInputField

    constructor(todoList) {
        this.#todoList = todoList
    }

    withInputField() {
        this.#hasInputField = true
        return this
    }

    build() {
        let htmlElement = document.createElement("div")
        if (this.#hasInputField) {
            this.#addInputField(htmlElement)
        }
        this.#renderNewToDoList(htmlElement)
        return htmlElement
    }

    #addInputField(htmlElement) {
        let inputElement = this.#getInputElementForAddingTodoList()
        this.#wireUpInputElementToHtmlElement(inputElement, htmlElement)
        htmlElement.appendChild(inputElement)
    }

    #renderNewToDoList(htmlElementToBeManipulated) {
        let todoOrderedList = this.#getNewTodoListOrderedListHtmlElement()
        this.#addDeleteButtons(todoOrderedList, htmlElementToBeManipulated)
        htmlElementToBeManipulated.appendChild(todoOrderedList)
    }

    #getInputElementForAddingTodoList() {
        let input = document.createElement(TodoListViewBuilder.inputTagName)
        input.setAttribute("aria-label", "add to do list")
        input.setAttribute("placeholder", "Add to do list")
        return input
    }

    #wireUpInputElementToHtmlElement(inputElement, htmlElement) {
        inputElement.addEventListener('keyup', (e) => {
            this.#inputKeyUp(e, htmlElement)
        })
    }

    #inputKeyUp(event, htmlElement) {
        if (event.key === "Enter") {
            this.#addTodoList(event.target.value, htmlElement)
            event.target.value = ""
        }
    }

    #addTodoList(todoListItemDisplayedText, htmlElementToBeManipulated) {
        this.#todoList.add(todoListItemDisplayedText)
        this.#reRenderToDoList(htmlElementToBeManipulated)
    }

    #reRenderToDoList(htmlElementToBeManipulated) {
        this.#cleanUpOldToDoListIfExists(htmlElementToBeManipulated)
        this.#renderNewToDoList(htmlElementToBeManipulated)
    }

    #cleanUpOldToDoListIfExists(elementToBeManipulated) {
        for (let orderedList of elementToBeManipulated.getElementsByTagName(TodoListDomBuilder.orderedListTagName)) {
            orderedList.remove()
        }
    }

    #getNewTodoListOrderedListHtmlElement() {
        return new TodoListDomBuilder()
            .withListCssClass("ordered-todo-list")
            .withListItemsCssClass("ordered-todo-list--items")
            .withDeleteButtons()
            .build(this.#todoList.getAll())
    }

    #addDeleteButtons(todoOrderedList, htmlElementToBeManipulated) {
        let deleteButtons = TodoListDomBuilder.getAllDeleteButtons(todoOrderedList)
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
        this.#todoList.removeById(todoListItemId)
        this.#reRenderToDoList(htmlElementToBeManipulated)
    }
}