'use strict';

export class TodoListDomBuilder {

    static orderedListTagName = "ol"
    static listItemTagName = "li"
    static buttonTagName = "button"
    static deleteButtonName = "Delete"
    static deleteButtonTextContent = TodoListDomBuilder.deleteButtonName
    static #deleteButtonNameQuerySelector = "[name='" + TodoListDomBuilder.deleteButtonName + "']"

    build(todoListItems) {
        let list = this.#getNewOrderedList();
        for (const item of todoListItems) {
            let listItem = this.#getNewListItem(item);
            list.append(listItem)
        }
        return list
    }

    withListCssClass(cssClass) {
        this.listCssClass = cssClass
        return this
    }

    withListItemsCssClass(cssClass) {
        this.listItemCssClass = cssClass
        return this
    }

    withDeleteButtons() {
        this.hasDeleteButtons = true
        return this
    }

    static getAllDeleteButtons(orderedList) {
        return orderedList.querySelectorAll(this.#deleteButtonNameQuerySelector)
    }

    #getNewOrderedList() {
        let list = document.createElement(TodoListDomBuilder.orderedListTagName);
        list.className = this.listCssClass;
        return list;
    }

    #getNewListItem(item) {
        let listItem = document.createElement(TodoListDomBuilder.listItemTagName);
        listItem.innerText = item.value.displayedText;
        listItem.className = this.listItemCssClass;

        if (this.hasDeleteButtons) {
            listItem.append(this.#getNewDeleteButtonForToDoListItem(item.id))
        }

        return listItem;
    }

    #getNewDeleteButtonForToDoListItem(itemId) {
        let button = document.createElement(TodoListDomBuilder.buttonTagName);
        button.value = itemId;
        button.name = TodoListDomBuilder.deleteButtonName;
        button.textContent = TodoListDomBuilder.deleteButtonTextContent;
        button.setAttribute("type", "button")
        return button;
    }
}