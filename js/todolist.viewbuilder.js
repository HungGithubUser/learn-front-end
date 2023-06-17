'use strict'

import { DIV_TAG_NAME, INPUT_TAG_NAME, ORDERED_LIST_TAG_NAME } from './constants.dom.js'
import { TodoListDomBuilder } from './todolist.dombuilder.js'

export class TodoListViewBuilder {
    #todoList
    #hasInputField
    #hasCompleteTaskButtons
    #hasCompleteTaskToggleOnItemClick
    #outerDivElementCssClass
    #inputElementCssClass
    #hasPagination

    constructor(todoList) {
        this.#todoList = todoList
    }

    withInputField() {
        this.#hasInputField = true
        return this
    }

    withCompleteTaskButtons() {
        this.#hasCompleteTaskButtons = true
        return this;
    }

    withCompleteTaskToggleOnItemClick() {
        this.#hasCompleteTaskToggleOnItemClick = true
        return this;
    }

    withInputElementCssClass(cssClass) {
        this.#inputElementCssClass = cssClass
        return this
    }

    withOuterDivElementCssClass(cssClass) {
        this.#outerDivElementCssClass = cssClass
        return this;
    }

    withPagination() {
        this.#hasPagination = true
        return this;
    }

    build() {
        let htmlElement = this.#getNewOuterDivWrapperElement()
        if (this.#hasInputField) {
            this.#addInputField(htmlElement)
        }
        this.#renderNewToDoList(htmlElement)
        return htmlElement
    }

    #getNewOuterDivWrapperElement() {
        let element = document.createElement(DIV_TAG_NAME)
        element.className = this.#outerDivElementCssClass
        return element
    }

    #addInputField(htmlElement) {
        let inputElement = this.#getInputElementForAddingTodoList()
        this.#wireUpInputElementToHtmlElement(inputElement, htmlElement)
        htmlElement.appendChild(inputElement)
    }

    #renderNewToDoList(htmlElementToBeManipulated) {
        let todoOrderedList = this.#getNewTodoListOrderedListHtmlElement()

        this.#addDeleteButtonsEvents(todoOrderedList, htmlElementToBeManipulated)

        if (this.#hasCompleteTaskButtons) {
            this.#addCompleteButtonsEvents(todoOrderedList, htmlElementToBeManipulated)
        }

        if (this.#hasCompleteTaskToggleOnItemClick) {
            this.#addCompleteTaskToggleOnItemClickEvents(todoOrderedList, htmlElementToBeManipulated)
        }

        htmlElementToBeManipulated.appendChild(todoOrderedList)
    }

    #getInputElementForAddingTodoList() {
        let input = document.createElement(INPUT_TAG_NAME)
        input.setAttribute("aria-label", "add to do list")
        input.setAttribute("placeholder", "Add to do list")
        input.className = this.#inputElementCssClass
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
        let domBuilder = new TodoListDomBuilder()
            .withListCssClass("list-group list-group-numbered m-5")
            .withCompletedListItemsCssClass("text-line-through")
            .withListItemsCssClass("list-group-item align-items-center")
            .withDeleteButtonsCssClass("btn btn-danger btn-sm float-end")
            .withDeleteButtons()

        if (this.#hasCompleteTaskButtons) {
            domBuilder = domBuilder.withCompleteButtons()
        }

        if (this.#hasCompleteTaskToggleOnItemClick) {
            domBuilder = domBuilder.withListItemsCursorPointer()
        }

        return domBuilder.build(this.#todoList.getAll())
    }

    #addDeleteButtonsEvents(todoOrderedList, htmlElementToBeManipulated) {
        let deleteButtons = TodoListDomBuilder.getAllDeleteButtons(todoOrderedList)
        const eventParameters = {
            elements: deleteButtons,
            htmlElement: htmlElementToBeManipulated,
            todoList: this.#todoList,
            callBackFunction: this.#deleteTodoListItem,
        }
        this.#wireUpListItemsClickedEvents(eventParameters)
    }

    #addCompleteButtonsEvents(todoOrderedList, htmlElementToBeManipulated) {
        let completeButtons = TodoListDomBuilder.getAllCompleteButtons(todoOrderedList)
        const eventParameters = {
            elements: completeButtons,
            htmlElement: htmlElementToBeManipulated,
            todoList: this.#todoList,
            callBackFunction: this.#completeTodoListItem,
        }
        this.#wireUpListItemsClickedEvents(eventParameters)
    }

    #addCompleteTaskToggleOnItemClickEvents(todoOrderedList, htmlElementToBeManipulated) {
        const eventParameters = {
            elements: todoOrderedList.childNodes,
            htmlElement: htmlElementToBeManipulated,
            todoList: this.#todoList,
            callBackFunction: this.#toggleCompleteTodoListItem
        }
        this.#wireUpListItemsClickedEvents(eventParameters)
    }

    #wireUpListItemsClickedEvents(eventParameters) {
        for (let element of eventParameters.elements) {
            element.addEventListener("click", (e) => {
                if (e.target !== e.currentTarget) return;
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

    #toggleCompleteTodoListItem(todoListItemId, todoList) {
        todoList.toggleCompleteTask(todoListItemId)
    }
}