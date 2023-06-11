'use strict';

import { CURSOR_POINTER_CSS_CLASS } from "./constants.css.js";
import { ORDERED_LIST_TAG_NAME, LIST_ITEM_TAG_NAME, BUTTON_TAG_NAME } from "./constants.dom.js";
import { getDeleteIcon } from "./icons.fontawesome.js";

export class TodoListDomBuilder {
    static deleteButtonName = "Delete"
    static deleteButtonTextContent = ""
    static completeButtonName = "Complete"
    static completeButtonTextContent = TodoListDomBuilder.completeButtonName
    #listCssClass
    #listItemCssClass
    #hasDeleteButtons
    #hasCompleteButton
    #completedListItemCssClass
    #hasListItemsCursorPointer

    build(todoListItems) {
        let list = this.#getNewOrderedList();
        for (const item of todoListItems) {
            let listItem = this.#getNewListItem(item);
            list.append(listItem)
        }
        return list
    }

    withListCssClass(cssClass) {
        this.#listCssClass = cssClass
        return this
    }

    withListItemsCssClass(cssClass) {
        this.#listItemCssClass = cssClass
        return this
    }

    withCompletedListItemsCssClass(cssClass) {
        this.#completedListItemCssClass = cssClass
        return this
    }

    withDeleteButtons() {
        this.#hasDeleteButtons = true
        return this
    }

    withCompleteButtons() {
        this.#hasCompleteButton = true
        return this
    }

    withListItemsCursorPointer() {
        this.#hasListItemsCursorPointer = true
        return this
    }

    static getAllDeleteButtons(orderedList) {
        return orderedList.querySelectorAll(this.#getButtonQuerySelector(this.deleteButtonName))
    }

    static getAllCompleteButtons(orderedList) {
        return orderedList.querySelectorAll(this.#getButtonQuerySelector(this.completeButtonName))
    }

    #getNewOrderedList() {
        let list = document.createElement(ORDERED_LIST_TAG_NAME);
        list.className = this.#listCssClass;
        return list;
    }

    #getNewListItem(item) {
        let listItem = document.createElement(LIST_ITEM_TAG_NAME);
        listItem.innerText = item.value.displayedText;
        console.log(listItem.className)
        listItem.className = this.#getListItemCssClassNames(item.value.isCompleted);
        listItem.value = item.id

        if (this.#hasDeleteButtons) {
            listItem.append(this.#getNewDeleteButtonForToDoListItem(item.id))
        }

        if (this.#hasCompleteButton && item.value.isCompleted === false) {
            listItem.append(this.#getNewCompleteButtonForToDoListItem(item.id))
        }

        return listItem;
    }

    static #getButtonQuerySelector(buttonName) { return "[name='" + buttonName + "']" }

    #getNewDeleteButtonForToDoListItem(itemId) {
        let button = this.#getNewStandardButton(itemId)
        button.name = TodoListDomBuilder.deleteButtonName;
        button.textContent = TodoListDomBuilder.deleteButtonTextContent;
        button.appendChild(getDeleteIcon())
        return button;
    }

    #getNewCompleteButtonForToDoListItem(itemId) {
        let button = this.#getNewStandardButton(itemId);
        button.name = TodoListDomBuilder.completeButtonName;
        button.textContent = TodoListDomBuilder.completeButtonTextContent;
        return button;
    }

    #getNewStandardButton(itemId) {
        let button = document.createElement(BUTTON_TAG_NAME);
        button.value = itemId;
        button.setAttribute("type", "button");
        return button;
    }

    #getListItemCssClassNames(todoListItemIsCompleted) {
        let classNames;
        classNames = this.#listItemCssClass;

        if (todoListItemIsCompleted) {
            classNames = this.#addCssClass(classNames, this.#completedListItemCssClass);
        }

        if (this.#hasListItemsCursorPointer) {
            classNames = this.#addCssClass(classNames, CURSOR_POINTER_CSS_CLASS);
        }

        return classNames
    }

    #addCssClass(currentClassNames, cssClass) {
        return !!currentClassNames ? currentClassNames + " " + cssClass : cssClass;
    }
}