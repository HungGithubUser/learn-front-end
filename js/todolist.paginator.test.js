import { DEFAULT_TODO_LIST_ITEM_PAGE_SIZE, NAV_TAG_NAME } from './constants.dom';
import { TodoList } from './todolist';
import { TodoListDomBuilder } from './todolist.dombuilder';
import { TodoListPaginator } from './todolist.paginator';
var sut
var todoList
beforeEach(() => {
    todoList = new TodoList()
    sut = new TodoListPaginator(todoList);
})
test('Should create Todolist paginator successfully', () => {
    let actual = getTodoListDomFromBuilder();
    expect(actual).toBeTruthy();
})

test('Should have paginator part', () => {
    let actual = sut.getPaginator()
    expect(actual).toBeInstanceOf(HTMLElement)
    expect(actual.tagName).toBe(NAV_TAG_NAME.toUpperCase())
})

test('Should return only default number of items', () => {
    while (todoList.getTotalCount() <= 2 * DEFAULT_TODO_LIST_ITEM_PAGE_SIZE) {
        todoList.add("learn Java Script")
    }
    let actual = getTodoListDomFromBuilder();
    expect(actual).toBeTruthy();
    expect(actual.childElementCount).toBe(DEFAULT_TODO_LIST_ITEM_PAGE_SIZE)
})

function getTodoListDomFromBuilder() {
    let domBuilder = new TodoListDomBuilder();
    return sut.getTodoList((todoListItems) => domBuilder.build(todoListItems));
}