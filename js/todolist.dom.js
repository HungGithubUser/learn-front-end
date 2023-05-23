'use strict';

export class TodoListDom {
    constructor(todoList) {
        this.todoList = todoList
    }

    static orderedListTagName = "ol"

    static listItemTagName = "li"

    static inputTagName = "input"

    getInputField() {
        return document.createElement(TodoListDom.inputTagName)
    }

    getAllAsOrderedList() {
        let list = this.#getNewOrderedList();
        for (const item of this.todoList.getAll()) {
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

    #getNewOrderedList() {
        let list = document.createElement(TodoListDom.orderedListTagName);
        list.className = this.listCssClass;
        return list;
    }

    #getNewListItem(item) {
        let listItem = document.createElement(TodoListDom.listItemTagName);
        listItem.innerText = item.value.displayedText;
        listItem.className = this.listItemCssClass;
        return listItem;
    }
}