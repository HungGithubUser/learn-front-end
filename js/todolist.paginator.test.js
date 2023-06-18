import { TodoList } from './todolist';
import { TodoListDomBuilder } from './todolist.dombuilder';
import { TodoListPaginator } from './todolist.paginator';

test('Should create Todolist paginator successfully', () => {
    let sut = new TodoListPaginator(new TodoList());
    let domBuilder = new TodoListDomBuilder();
    let actual = sut.getTodoList((todoListItems) => domBuilder.build(todoListItems));
    expect(actual).not.toBeNull();
})