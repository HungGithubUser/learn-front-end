export class TodoListPaginator {
    #todoList

    constructor(todoList) {
        this.#todoList = todoList
    }

    getTodoList(createTodoListDomByListItems) {
        createTodoListDomByListItems(this.#todoList.getAll())
    }
}