'use strict';

export class TodoListDomBuilder {
    constructor(todoList) {
        this.todoList = todoList
    }

    static orderedListTagName = "ol"

    static listItemTagName = "li"

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
        let list = document.createElement(TodoListDomBuilder.orderedListTagName);
        list.className = this.listCssClass;
        return list;
    }

    #getNewListItem(item) {
        let listItem = document.createElement(TodoListDomBuilder.listItemTagName);
        listItem.innerText = item.value.displayedText;
        listItem.className = this.listItemCssClass;
        return listItem;
    }
}