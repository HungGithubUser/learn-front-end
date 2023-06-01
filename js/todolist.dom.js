'use strict';

export class TodoListDomBuilder {

    static orderedListTagName = "ol"
    static listItemTagName = "li"
    static buttonTagName = "button"
    static deleteButtonName = "delete"
    static deleteButtonTextContent = TodoListDomBuilder.deleteButtonName

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

    #getNewOrderedList() {
        let list = document.createElement(TodoListDomBuilder.orderedListTagName);
        list.className = this.listCssClass;
        return list;
    }

    #getNewListItem(item) {
        let listItem = document.createElement(TodoListDomBuilder.listItemTagName);
        listItem.innerText = item.value.displayedText;
        listItem.className = this.listItemCssClass;

        if (this.hasDeleteButton) {
            listItem.append(this.#getNewDeleteButton(item))
        }
        
        return listItem;
    }

    #getNewDeleteButton(item) {
        let button = document.createElement(TodoListDomBuilder.buttonTagName);
        button.value = item.id;
        button.name = TodoListDomBuilder.deleteButtonName;
        button.textContent = TodoListDomBuilder.deleteButtonTextContent;
        return button;
    }
}