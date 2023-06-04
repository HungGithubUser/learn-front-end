'use strict'

import { DIV_TAG_NAME, INPUT_TAG_NAME, ORDERED_LIST_TAG_NAME } from './constants.dom.js'
import { TodoListDomBuilder } from './todolist.dombuilder.js'

export class TodoListViewBuilder {
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
        let htmlElement = document.createElement(DIV_TAG_NAME)
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
        this.#addDeleteButtonsEvents(todoOrderedList, htmlElementToBeManipulated)
        this.#addCompleteButtonsEvents(todoOrderedList, htmlElementToBeManipulated)
        htmlElementToBeManipulated.appendChild(todoOrderedList)
    }

    #getInputElementForAddingTodoList() {
        let input = document.createElement(INPUT_TAG_NAME)
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
        for (let orderedList of elementToBeManipulated.getElementsByTagName(ORDERED_LIST_TAG_NAME)) {
            orderedList.remove()
        }
    }

    #getNewTodoListOrderedListHtmlElement() {
        return new TodoListDomBuilder()
            .withListCssClass("ordered-todo-list")
            .withListItemsCssClass("ordered-todo-list--items")
            .withCompletedListItemsCssClass("ordered-todo-list--items-completed")
            .withDeleteButtons()
            .withCompleteButtons()
            .build(this.#todoList.getAll())
    }

    #addDeleteButtonsEvents(todoOrderedList, htmlElementToBeManipulated) {
        let deleteButtons = TodoListDomBuilder.getAllDeleteButtons(todoOrderedList)
        const eventParameters = {
            buttons: deleteButtons,
            htmlElement: htmlElementToBeManipulated,
            todoList: this.#todoList,
            callBackFunction: this.#deleteTodoListItem
        }
        this.#wireUpListItemButtonsClickEvents(eventParameters)
    }

    #addCompleteButtonsEvents(todoOrderedList, htmlElementToBeManipulated) {
        let completeButtons = TodoListDomBuilder.getAllCompleteButtons(todoOrderedList)
        const eventParameters = {
            buttons: completeButtons,
            htmlElement: htmlElementToBeManipulated,
            todoList: this.#todoList,
            callBackFunction: this.#completeTodoListItem
        }
        this.#wireUpListItemButtonsClickEvents(eventParameters)
    }

    #wireUpListItemButtonsClickEvents(eventParameters) {
        for (let button of eventParameters.buttons) {
            button.addEventListener("click", (e) => {
                eventParameters.callBackFunction(Number(e.target.value), eventParameters.todoList)
                this.#reRenderToDoList(eventParameters.htmlElement)
            })
        }
    }

    #deleteTodoListItem(todoListItemId, todoList) {
        todoList.removeById(todoListItemId)
    }

    #completeTodoListItem(todoListItemId, todoList) {
        todoList.completeTask(todoListItemId)
    }
}