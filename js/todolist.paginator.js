import { DEFAULT_TODO_LIST_ITEM_PAGE_SIZE, NAV_TAG_NAME } from "./constants.dom.js"

export class TodoListPaginator {
    #todoList

    constructor(todoList) {
        this.#todoList = todoList
    }

    getTodoList(createTodoListDomByListItems) {
        return createTodoListDomByListItems(this.#todoList.getTop(DEFAULT_TODO_LIST_ITEM_PAGE_SIZE))
    }

    getPaginator() {
        return document.createElement(NAV_TAG_NAME)
    }
}