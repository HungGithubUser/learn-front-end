'use strict';

export class TodoListDom {

    static orderedListTagName = "ol"
    static listItemTagName = "li"
    static buttonTagName = "button"
    static deleteButtonName = "Delete"
    static deleteButtonTextContent = TodoListDom.deleteButtonName
    static #deleteButtonNameQuerySelector = "[name='" + TodoListDom.deleteButtonName + "']"

    getOrderedList(todoListItems) {
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

    withDeleteButton() {
        this.hasDeleteButton = true
        return this
    }

    static getAllDeleteButtons(orderedList){
        return orderedList.querySelectorAll(this.#deleteButtonNameQuerySelector)
    }

    #getNewOrderedList() {
        let list = document.createElement(TodoListDom.orderedListTagName);
        list.className = this.listCssClass;
        return list;
    }

    #getNewListItem(item) {
        let listItem = document.createElement(TodoListDom.listItemTagName);
        listItem.innerText = item.value.displayedText;
        listItem.className = this.listItemCssClass;

        if (this.hasDeleteButton) {
            listItem.append(this.#getNewDeleteButtonForToDoListItem(item.id))
        }

        return listItem;
    }

    #getNewDeleteButtonForToDoListItem(itemId) {
        let button = document.createElement(TodoListDom.buttonTagName);
        button.value = itemId;
        button.name = TodoListDom.deleteButtonName;
        button.textContent = TodoListDom.deleteButtonTextContent;
        button.setAttribute("type", "button")
        return button;
    }
}