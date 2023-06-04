'use strict';

import { ORDERED_LIST_TAG_NAME, LIST_ITEM_TAG_NAME, BUTTON_TAG_NAME } from "./constants.dom.js";

export class TodoListDomBuilder {
    static deleteButtonName = "Delete"
    static deleteButtonTextContent = TodoListDomBuilder.deleteButtonName
    static #getButtonQuerySelector(buttonName) { return "[name='" + buttonName + "']" }
    static completeButtonName = "Complete"
    static completeButtonTextContent = TodoListDomBuilder.completeButtonName
    #listCssClass
    #listItemCssClass
    #hasDeleteButtons
    #hasCompleteButton
    #completedListItemCssClass

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

        this.#setListItemCssClasses(listItem, item.value.isCompleted);

        if (this.#hasDeleteButtons) {
            listItem.append(this.#getNewDeleteButtonForToDoListItem(item.id))
        }

        if (this.#hasCompleteButton && item.value.isCompleted === false) {
            listItem.append(this.#getNewCompleteButtonForToDoListItem(item.id))
        }

        return listItem;
    }

    #getNewDeleteButtonForToDoListItem(itemId) {
        let button = this.#getNewStandardButton(itemId)
        button.name = TodoListDomBuilder.deleteButtonName;
        button.textContent = TodoListDomBuilder.deleteButtonTextContent;
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

    #setListItemCssClasses(listItem, todoListItemIsCompleted) {
        const shouldAddCompletedListItemCssClass = todoListItemIsCompleted && this.#completedListItemCssClass;

        if (!this.#listItemCssClass && shouldAddCompletedListItemCssClass) {
            listItem.className = this.#completedListItemCssClass;
            return
        }

        listItem.className = this.#listItemCssClass;
        if (shouldAddCompletedListItemCssClass) {
            listItem.className += " " + this.#completedListItemCssClass;
        }
    }
}